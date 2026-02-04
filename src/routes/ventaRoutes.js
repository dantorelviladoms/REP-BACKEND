const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

// Rutas CRUD para ventas
router.post('/', ventaController.createVenta);
router.get('/', ventaController.getVentas);
router.get('/:id', ventaController.getVenta);
router.put('/:id', ventaController.updateVenta);
router.delete('/:id', ventaController.deleteVenta);
router.get('/usuario/:userId', ventaController.getVentasByUsuario);

module.exports = router;
