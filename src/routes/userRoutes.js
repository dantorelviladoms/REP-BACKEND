const express = require('express');
const router = express.Router();

// Importamos el controlador
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestió d'usuaris (CRUD)
 */

// RUTA PERFIL PROPI (accessible per qualsevol usuari autenticat)

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Obté el perfil de l'usuari autenticat
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil de l'usuari
 *       401:
 *         description: No autenticat
 */
router.get('/me', authMiddleware, userController.getMe);

/**
 * @swagger
 * /api/user/me:
 *   put:
 *     summary: Actualitza el perfil de l'usuari autenticat
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualitzat
 */
router.put('/me', authMiddleware, userController.updateMe);

// RUTAS CRUD (Admin)

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Crear un nou usuari (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuari creat amb èxit
 */
router.post('/', authMiddleware, roleMiddleware('admin'), userController.createUser);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Obté tots els usuaris (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista d'usuaris
 */
router.get('/', authMiddleware, roleMiddleware('admin'), userController.getUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obté un usuari pel seu ID (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'usuari
 *     responses:
 *       200:
 *         description: Usuari trobat
 *       404:
 *         description: Usuari no trobat
 */
router.get('/:id', authMiddleware, roleMiddleware('admin'), userController.getUser);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Actualitza un usuari pel seu ID (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuari actualitzat
 */
router.put('/:id', authMiddleware, roleMiddleware('admin'), userController.updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Elimina un usuari pel seu ID (Admin)
 *     tags: [Users]
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
 *         description: Usuari eliminat
 */
router.delete('/:id', authMiddleware, roleMiddleware('admin'), userController.deleteUser);

// Exportamos el router para usarlo en index.js
module.exports = router;
