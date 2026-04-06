require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const authRoutes = require('./routes/authRoutes');


const cors = require('cors');

const app = express(); // 👈 crea primero la app
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json());

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
