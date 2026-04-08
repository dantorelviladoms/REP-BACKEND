const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints d'autenticació d'usuaris
 */

// Rutas de autenticación

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nou usuari
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuari creat amb èxit
 *       400:
 *         description: Error de validació
 */
router.post('/register', authController.register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login d'usuari i retorn de token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login correcte, retorna token
 *       401:
 *         description: Credencials incorrectes
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresca el token JWT
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Nou token generat
 */
router.post('/refresh', authController.refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Tanca la sessió de l'usuari
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sessió tancada correctament
 */
router.post('/logout', authController.logout);

module.exports = router;
