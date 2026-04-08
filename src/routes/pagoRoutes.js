const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

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
 *     summary: Crear un nou pagament
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pagament creat
 */
// Rutas CRUD para pagos
router.post('/', pagoController.createPago);
/**
 * @swagger
 * /api/pagos:
 *   get:
 *     summary: Obtenir tots els pagaments
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de pagaments
 */
router.get('/', pagoController.getPagos);

/**
 * @swagger
 * /api/pagos/{id}:
 *   get:
 *     summary: Obtenir pagament per ID
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
router.get('/:id', pagoController.getPago);

/**
 * @swagger
 * /api/pagos/{id}:
 *   put:
 *     summary: Actualitzar pagament per ID
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
router.put('/:id', pagoController.updatePago);

/**
 * @swagger
 * /api/pagos/{id}:
 *   delete:
 *     summary: Eliminar pagament per ID
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
router.delete('/:id', pagoController.deletePago);

module.exports = router;
