const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

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
 *     summary: Crear una nova venda (Admin)
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Venda creada
 */
// Rutas CRUD para ventas - només admin
router.post('/', authMiddleware, roleMiddleware('admin'), ventaController.createVenta);

/**
 * @swagger
 * /api/ventas:
 *   get:
 *     summary: Obtenir totes les vendes (Admin)
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de vendes
 */
router.get('/', authMiddleware, roleMiddleware('admin'), ventaController.getVentas);

/**
 * @swagger
 * /api/ventas/{id}:
 *   get:
 *     summary: Obtenir venda per ID (Admin)
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
router.get('/:id', authMiddleware, roleMiddleware('admin'), ventaController.getVenta);

/**
 * @swagger
 * /api/ventas/{id}:
 *   put:
 *     summary: Actualitzar venda per ID (Admin)
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
router.put('/:id', authMiddleware, roleMiddleware('admin'), ventaController.updateVenta);

/**
 * @swagger
 * /api/ventas/{id}:
 *   delete:
 *     summary: Eliminar venda per ID (Admin)
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
router.delete('/:id', authMiddleware, roleMiddleware('admin'), ventaController.deleteVenta);

/**
 * @swagger
 * /api/ventas/usuario/{userId}:
 *   get:
 *     summary: Obtenir totes les vendes d'un usuari (Admin)
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
router.get('/usuario/:userId', authMiddleware, roleMiddleware('admin'), ventaController.getVentasByUsuario);

module.exports = router;
