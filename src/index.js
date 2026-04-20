require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const authRoutes = require('./routes/authRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');


const cors = require('cors');

const app = express(); // 👈 crea primero la app
app.use(cors()); // Permite peticiones desde el frontend

// ⚠️ Webhook de Stripe necesita el body RAW (antes de express.json)
app.use('/api/checkout/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());

// Documentació Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conecta a la base de datos
connectDB();

// Ruta principal
app.get('/', (req, res) => res.send('API DTL PREMIUM CAR (E-commerce) ACTIVO!'));

// Rutas de vehículos, users, ventas, pagos y carrito
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/user', userRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/checkout', checkoutRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
