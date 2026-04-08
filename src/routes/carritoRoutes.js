const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

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
// Añadir al carrito (POST)
router.post('/', carritoController.addToCarrito);

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
// Obtener todos los carritos - admin (GET)
router.get('/', carritoController.getAllCarritos);

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
// Obtener carrito de un usuario (GET)
router.get('/usuario/:userId', carritoController.getCarritoByUsuario);

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
// Obtener item por ID (GET)
router.get('/:id', carritoController.getCarritoItem);

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
// Actualizar item del carrito (PUT)
router.put('/:id', carritoController.updateCarritoItem);

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
// Eliminar item del carrito (DELETE)
router.delete('/:id', carritoController.deleteCarritoItem);

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
// Vaciar carrito de un usuario (DELETE)
router.delete('/vaciar/:userId', carritoController.vaciarCarrito);

module.exports = router;
