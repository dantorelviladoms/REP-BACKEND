const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Carrito
 *   description: Gestió de carretons
 */

/**
 * @swagger
 * /api/carrito:
 *   post:
 *     summary: Afegir producte al carretó
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Producte afegit
 */
// Añadir al carrito (POST) - usuario autenticado
router.post('/', authMiddleware, carritoController.addToCarrito);

/**
 * @swagger
 * /api/carrito:
 *   get:
 *     summary: Obtenir tots els carretons (Admin)
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de carretons
 */
// Obtener todos los carritos - solo admin (GET)
router.get('/', authMiddleware, roleMiddleware('admin'), carritoController.getAllCarritos);

/**
 * @swagger
 * /api/carrito/usuario/{userId}:
 *   get:
 *     summary: Obtenir carretó d'un usuari
 *     tags: [Carrito]
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
 *         description: Carretó de l'usuari
 */
// Obtener carrito de un usuario (GET) - usuario autenticado
router.get('/usuario/:userId', authMiddleware, carritoController.getCarritoByUsuario);

/**
 * @swagger
 * /api/carrito/{id}:
 *   get:
 *     summary: Obtenir ítem del carretó per ID
 *     tags: [Carrito]
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
 *         description: Item del carretó
 */
// Obtener item por ID (GET) - usuario autenticado
router.get('/:id', authMiddleware, carritoController.getCarritoItem);

/**
 * @swagger
 * /api/carrito/{id}:
 *   put:
 *     summary: Actualitzar item del carretó
 *     tags: [Carrito]
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
 *         description: Carretó actualitzat
 */
// Actualizar item del carrito (PUT) - usuario autenticado
router.put('/:id', authMiddleware, carritoController.updateCarritoItem);

/**
 * @swagger
 * /api/carrito/{id}:
 *   delete:
 *     summary: Eliminar ítem del carretó
 *     tags: [Carrito]
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
 *         description: Item eliminat
 */
// Eliminar item del carrito (DELETE) - usuario autenticado
router.delete('/:id', authMiddleware, carritoController.deleteCarritoItem);

/**
 * @swagger
 * /api/carrito/vaciar/{userId}:
 *   delete:
 *     summary: Buidar el carretó d'un usuari
 *     tags: [Carrito]
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
 *         description: Carretó buidat
 */
// Vaciar carrito de un usuario (DELETE) - usuario autenticado
router.delete('/vaciar/:userId', authMiddleware, carritoController.vaciarCarrito);

module.exports = router;
