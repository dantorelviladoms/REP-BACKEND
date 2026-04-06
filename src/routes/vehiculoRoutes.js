const express = require('express');
const router = express.Router();

// Importem el controlador
const vehiculoController = require('../controllers/vehiculoController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// RUTES CRUD

// 🔹 Crear un vehículo (POST) - només admin
router.post('/', authMiddleware, roleMiddleware('admin'), vehiculoController.createVehiculo);

// 🔹 Obtener todos los vehículos (GET)
router.get('/', vehiculoController.getVehiculos);

// 🔹 Obtener un vehículo por ID (GET)
router.get('/:id', vehiculoController.getVehiculo);

// 🔹 Actualizar un vehículo por ID (PUT) - només admin
router.put('/:id', authMiddleware, roleMiddleware('admin'), vehiculoController.updateVehiculo);

// 🔹 Eliminar un vehículo por ID (DELETE) - només admin
router.delete('/:id', authMiddleware, roleMiddleware('admin'), vehiculoController.deleteVehiculo);

// Exportem el router perquè es pugui usar a index.js
module.exports = router;
