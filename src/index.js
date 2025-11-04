require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const pagoRoutes = require('./routes/pagoRoutes');


const app = express(); // 👈 crea primero la app
app.use(express.json());

// Conecta a la base de datos
connectDB();

// Ruta principal
app.get('/', (req, res) => res.send('API DTL PREMIUM CAR (E-commerce) ACTIVO!'));

// Rutas de vehículos, users, ventas y pagos
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/pagos', pagoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
