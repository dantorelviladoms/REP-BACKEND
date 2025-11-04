const express = require('express');
const router = express.Router();

// Importem el controlador
const vehiculoController = require('../controllers/vehiculoController');

// RUTES CRUD

// 🔹 Crear un vehículo (POST)
router.post('/', vehiculoController.createVehiculo);

// 🔹 Obtener todos los vehículos (GET)
router.get('/', vehiculoController.getVehiculos);

// 🔹 Obtener un vehículo por ID (GET)
router.get('/:id', vehiculoController.getVehiculo);

// 🔹 Actualizar un vehículo por ID (PUT)
router.put('/:id', vehiculoController.updateVehiculo);

// 🔹 Eliminar un vehículo por ID (DELETE)
router.delete('/:id', vehiculoController.deleteVehiculo);

// Exportem el router perquè es pugui usar a index.js
module.exports = router;
