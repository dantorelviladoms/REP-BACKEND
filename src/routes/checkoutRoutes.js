const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: Flux de checkout amb Stripe
 */

/**
 * @swagger
 * /api/checkout/create-session:
 *   post:
 *     summary: Crear sessió de pagament Stripe
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingAddress
 *             properties:
 *               shippingAddress:
 *                 type: object
 *                 required:
 *                   - name
 *                   - address
 *                   - city
 *                   - postalCode
 *                   - phone
 *                 properties:
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   phone:
 *                     type: string
 *     responses:
 *       200:
 *         description: Sessió creada correctament
 *       400:
 *         description: Error de validació
 */
router.post('/create-session', authMiddleware, checkoutController.createCheckoutSession);

/**
 * @swagger
 * /api/checkout/webhook:
 *   post:
 *     summary: Webhook de Stripe per confirmar pagaments
 *     tags: [Checkout]
 *     description: Endpoint cridat per Stripe. No requereix autenticació JWT.
 *     responses:
 *       200:
 *         description: Webhook rebut
 */
// El webhook NO usa authMiddleware — Stripe lo llama directamente
// El body raw se configura en index.js antes del middleware JSON
router.post('/webhook', checkoutController.handleWebhook);

/**
 * @swagger
 * /api/checkout/order/{id}:
 *   get:
 *     summary: Obtenir estat d'una comanda
 *     tags: [Checkout]
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
 *         description: Detall de la comanda
 *       404:
 *         description: Comanda no trobada
 */
router.get('/order/:id', authMiddleware, checkoutController.getOrderStatus);

module.exports = router;
