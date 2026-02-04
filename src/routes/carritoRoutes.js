const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// Rutas del carrito

// Añadir al carrito (POST)
router.post('/', carritoController.addToCarrito);

// Obtener todos los carritos - admin (GET)
router.get('/', carritoController.getAllCarritos);

// Obtener carrito de un usuario (GET)
router.get('/usuario/:userId', carritoController.getCarritoByUsuario);

// Obtener item por ID (GET)
router.get('/:id', carritoController.getCarritoItem);

// Actualizar item del carrito (PUT)
router.put('/:id', carritoController.updateCarritoItem);

// Eliminar item del carrito (DELETE)
router.delete('/:id', carritoController.deleteCarritoItem);

// Vaciar carrito de un usuario (DELETE)
router.delete('/vaciar/:userId', carritoController.vaciarCarrito);

module.exports = router;
