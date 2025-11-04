const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

// Rutas CRUD para pagos
router.post('/', pagoController.createPago);
router.get('/', pagoController.getPagos);
router.get('/:id', pagoController.getPago);
router.put('/:id', pagoController.updatePago);
router.delete('/:id', pagoController.deletePago);

module.exports = router;
