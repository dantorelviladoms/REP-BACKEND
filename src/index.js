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
const orderRoutes = require('./routes/orderRoutes');
const healthRoutes = require('./routes/healthRoutes');

const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Servir archivos estáticos (imágenes de vehículos subidas)
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// ⚠️ Webhook de Stripe necesita el body RAW (antes de express.json)
app.use('/api/checkout/webhook', express.raw({ type: 'application/json' }));

// Observabilitat (Request ID i Logger HTTP)
const requestId = require('./middleware/requestId');
const httpLogger = require('./middleware/httpLogger');
app.use(requestId);
app.use(httpLogger);

app.use(express.json());

// Documentació Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conecta a la base de datos
connectDB();

// Ruta principal
app.get('/', (req, res) => res.send('API DTL PREMIUM CAR (E-commerce) ACTIVO!'));

// Endpoint temporal de debug per comprovar observabilitat
app.get('/api/debug/error', (req, res, next) => {
  next(new Error('Error de prova per observabilitat'));
});

// Rutas de vehículos, users, ventas, pagos y carrito
app.use('/api', healthRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/user', userRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);

// Middleware global d'errors
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));

