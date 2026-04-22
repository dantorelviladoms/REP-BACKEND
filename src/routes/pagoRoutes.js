const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Pagos
 *   description: Gestió de pagaments
 */

/**
 * @swagger
 * /api/pagos:
 *   post:
 *     summary: Crear un nou pagament (Admin)
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pagament creat
 */
// Rutas CRUD para pagos - només admin
router.post('/', authMiddleware, roleMiddleware('admin'), pagoController.createPago);

/**
 * @swagger
 * /api/pagos:
 *   get:
 *     summary: Obtenir tots els pagaments (Admin)
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de pagaments
 */
router.get('/', authMiddleware, roleMiddleware('admin'), pagoController.getPagos);

/**
 * @swagger
 * /api/pagos/{id}:
 *   get:
 *     summary: Obtenir pagament per ID (Admin)
 *     tags: [Pagos]
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
 *         description: Detall del pagament
 */
router.get('/:id', authMiddleware, roleMiddleware('admin'), pagoController.getPago);

/**
 * @swagger
 * /api/pagos/{id}:
 *   put:
 *     summary: Actualitzar pagament per ID (Admin)
 *     tags: [Pagos]
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
 *         description: Pagament actualitzat
 */
router.put('/:id', authMiddleware, roleMiddleware('admin'), pagoController.updatePago);

/**
 * @swagger
 * /api/pagos/{id}:
 *   delete:
 *     summary: Eliminar pagament per ID (Admin)
 *     tags: [Pagos]
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
 *         description: Pagament eliminat
 */
router.delete('/:id', authMiddleware, roleMiddleware('admin'), pagoController.deletePago);

module.exports = router;
