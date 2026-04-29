const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestió de comandes
 */

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Obté les comandes de l'usuari autenticat
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de comandes pròpies
 *       401:
 *         description: No autenticat
 */
router.get('/my-orders', authMiddleware, orderController.getMyOrders);

/**
 * @swagger
 * /api/orders/stats:
 *   get:
 *     summary: Estadístiques de comandes per al dashboard admin (Chart.js)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadístiques de comandes
 *       403:
 *         description: Accés prohibit
 */
router.get('/stats', authMiddleware, roleMiddleware('admin'), orderController.getOrderStats);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obté totes les comandes (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, paid, cancelled, refunded]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Llista de totes les comandes
 *       403:
 *         description: Accés prohibit
 */
router.get('/', authMiddleware, roleMiddleware('admin'), orderController.getAllOrders);

module.exports = router;
