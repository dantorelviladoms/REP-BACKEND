const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// Configuración de multer para subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/vehiculos'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Solo se permiten imágenes'));
  }
});

const vehiculoController = require('../controllers/vehiculoController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


/**
 * @swagger
 * tags:
 *   name: Vehiculos
 *   description: Gestió de Vehicles
 */

// RUTES CRUD

/**
 * @swagger
 * /api/vehiculos:
 *   post:
 *     summary: Crear un nou vehicle (Només admin)
 *     tags: [Vehiculos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehiculo'
 *     responses:
 *       201:
 *         description: Vehicle creat
 */
// 🔹 Subir imágenes de vehículo (POST) - solo admin
// Devuelve array de URLs accesibles desde el frontend
router.post(
  '/upload-images',
  authMiddleware,
  roleMiddleware('admin'),
  upload.array('images', 10),
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ status: 'error', message: 'No se subieron imágenes' });
    }
    const urls = req.files.map(f => `/uploads/vehiculos/${f.filename}`);
    res.json({ status: 'success', data: urls });
  }
);

// 🔹 Crear un vehículo (POST) - solo admin
router.post('/', authMiddleware, roleMiddleware('admin'), vehiculoController.createVehiculo);


/**
 * @swagger
 * /api/vehiculos:
 *   get:
 *     summary: Obtener tots els vehicles
 *     tags: [Vehiculos]
 *     responses:
 *       200:
 *         description: Llista de vehicles
 */
// 🔹 Obtener todos los vehículos (GET)
router.get('/', vehiculoController.getVehiculos);

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   get:
 *     summary: Obtenir un vehicle per ID
 *     tags: [Vehiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle trobat
 */
// 🔹 Obtener un vehículo por ID (GET)
router.get('/:id', vehiculoController.getVehiculo);

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   put:
 *     summary: Actualitzar un vehicle (Només admin)
 *     tags: [Vehiculos]
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
 *         description: Vehicle actualitzat
 */
// 🔹 Actualizar un vehículo por ID (PUT) - només admin
router.put('/:id', authMiddleware, roleMiddleware('admin'), vehiculoController.updateVehiculo);

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   delete:
 *     summary: Eliminar un vehicle (Només admin)
 *     tags: [Vehiculos]
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
 *         description: Vehicle eliminat
 */
// 🔹 Eliminar un vehículo por ID (DELETE) - només admin
router.delete('/:id', authMiddleware, roleMiddleware('admin'), vehiculoController.deleteVehiculo);

// Exportem el router perquè es pugui usar a index.js
module.exports = router;
