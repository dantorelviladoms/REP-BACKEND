const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

/**
 * @swagger
 * tags:
 *   name: Ventas
 *   description: Gestió de vendes
 */

/**
 * @swagger
 * /api/ventas:
 *   post:
 *     summary: Crear una nova venda
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Venda creada
 */
// Rutas CRUD para ventas
router.post('/', ventaController.createVenta);
/**
 * @swagger
 * /api/ventas:
 *   get:
 *     summary: Obtenir totes les vendes
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de vendes
 */
router.get('/', ventaController.getVentas);

/**
 * @swagger
 * /api/ventas/{id}:
 *   get:
 *     summary: Obtenir venda per ID
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detall de la venda
 */
router.get('/:id', ventaController.getVenta);

/**
 * @swagger
 * /api/ventas/{id}:
 *   put:
 *     summary: Actualitzar venda per ID
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venda actualitzada
 */
router.put('/:id', ventaController.updateVenta);

/**
 * @swagger
 * /api/ventas/{id}:
 *   delete:
 *     summary: Eliminar venda per ID
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venda eliminada
 */
router.delete('/:id', ventaController.deleteVenta);

/**
 * @swagger
 * /api/ventas/usuario/{userId}:
 *   get:
 *     summary: Obtenir totes les vendes d'un usuari
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Llista de vendes de l'usuari
 */
router.get('/usuario/:userId', ventaController.getVentasByUsuario);

module.exports = router;
