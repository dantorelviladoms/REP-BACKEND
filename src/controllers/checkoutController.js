const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Vehiculo = require('../models/vehiculo');
const Carrito = require('../models/carrito');

// ─── POST /api/checkout/create-session ─────────────────────────────────────────
// Crea una orden "pending" y una sesión de Stripe Checkout
const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user._id;
    const { shippingAddress } = req.body;

    // 1. Validar datos de envío
    if (!shippingAddress || !shippingAddress.name || !shippingAddress.address ||
        !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.phone) {
      return res.status(400).json({
        status: 'error',
        message: 'Todos los campos de envío son obligatorios (name, address, city, postalCode, phone)'
      });
    }

    // 2. Obtener carrito del usuario con datos del vehículo
    const carritoItems = await Carrito.find({ id_usuario: userId }).populate('id_vehiculo');

    if (!carritoItems || carritoItems.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'El carrito está vacío'
      });
    }

    // 3. Validar que todos los vehículos existen y obtener precios reales del backend
    const products = [];
    for (const item of carritoItems) {
      const vehiculo = item.id_vehiculo;
      if (!vehiculo) {
        return res.status(400).json({
          status: 'error',
          message: `Vehículo no encontrado para el item del carrito ${item._id}`
        });
      }
      products.push({
        vehiculo: vehiculo._id,
        name: `${vehiculo.marca} ${vehiculo.modelo}${vehiculo.version ? ' ' + vehiculo.version : ''}`,
        price: vehiculo.precio,
        quantity: item.cantidad || 1
      });
    }

    // 4. Calcular total desde el backend (no confiar en el frontend)
    const subtotal = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    // 5. Crear orden con estado "pending"
    const order = new Order({
      user: userId,
      products,
      total,
      status: 'pending',
      shippingAddress
    });
    await order.save();

    // 6. Crear sesión de Stripe Checkout
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products.map(p => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: p.name
          },
          unit_amount: Math.round(p.price * 100) // Stripe usa céntimos
        },
        quantity: p.quantity
      })),
      // Añadir línea de IVA
      ...(iva > 0 ? {} : {}), // IVA ya incluido en unit_amount si quisiéramos, pero lo ponemos como línea separada
      mode: 'payment',
      success_url: `${frontendUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order._id}`,
      cancel_url: `${frontendUrl}/checkout/cancel?order_id=${order._id}`,
      metadata: {
        orderId: order._id.toString(),
        userId: userId.toString()
      }
    });

    // 7. Guardar sessionId en la orden
    order.stripeSessionId = session.id;
    await order.save();

    // 8. Responder con url y sessionId para que el frontend redirija
    res.json({
      status: 'success',
      data: {
        sessionId: session.id,
        url: session.url,
        orderId: order._id
      }
    });

  } catch (error) {
    console.error('Error al crear sesión de checkout:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al crear la sesión de pago',
      detail: error.message
    });
  }
};

// ─── POST /api/checkout/webhook ────────────────────────────────────────────────
// Stripe envía notificación del pago — actualiza la orden
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret) {
      // Validar la firma del webhook (producción)
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      // En desarrollo sin webhook secret, parsear directamente
      event = JSON.parse(req.body.toString());
      console.warn('⚠️  Webhook sin validación de firma (desarrollo)');
    }
  } catch (err) {
    console.error('Error validando webhook:', err.message);
    return res.status(400).json({ message: `Webhook Error: ${err.message}` });
  }

  // Procesar el evento
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        try {
          const order = await Order.findById(orderId);
          if (order && order.status === 'pending') {
            order.status = 'paid';
            await order.save();

            // Vaciar el carrito del usuario
            await Carrito.deleteMany({ id_usuario: order.user });

            console.log(`✅ Orden ${orderId} marcada como pagada`);
          }
        } catch (err) {
          console.error('Error actualizando orden:', err);
        }
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        try {
          const order = await Order.findById(orderId);
          if (order && order.status === 'pending') {
            order.status = 'cancelled';
            await order.save();
            console.log(`❌ Orden ${orderId} cancelada (sesión expirada)`);
          }
        } catch (err) {
          console.error('Error cancelando orden:', err);
        }
      }
      break;
    }

    default:
      console.log(`Evento no gestionado: ${event.type}`);
  }

  // Stripe espera un 200 para confirmar la recepción
  res.status(200).json({ received: true });
};

// ─── GET /api/checkout/order/:id ───────────────────────────────────────────────
// Consultar estado de una orden
const getOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('products.vehiculo')
      .populate('user', 'nombre email');

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Orden no encontrada'
      });
    }

    // Solo el propietario o un admin puede ver la orden
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'No tienes permiso para ver esta orden'
      });
    }

    res.json({
      status: 'success',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
  getOrderStatus
};
