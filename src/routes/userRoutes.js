const express = require('express');
const router = express.Router();

// Importamos el controlador
const userController = require('../controllers/userController');

// RUTAS CRUD

// 🔹 Crear un usuario (POST)
router.post('/', userController.createUser);

// 🔹 Obtener todos los usuarios (GET)
router.get('/', userController.getUsers);

// 🔹 Obtener un usuario por ID (GET)
router.get('/:id', userController.getUser);

// 🔹 Actualizar un usuario por ID (PUT)
router.put('/:id', userController.updateUser);

// 🔹 Eliminar un usuario por ID (DELETE)
router.delete('/:id', userController.deleteUser);

// Exportamos el router para usarlo en index.js
module.exports = router;
