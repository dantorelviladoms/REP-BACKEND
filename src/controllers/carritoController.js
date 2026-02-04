const carritoService = require('../services/carritoService');

// Añadir al carrito
const addToCarrito = async (req, res) => {
    try {
        const item = await carritoService.addToCarrito(req.body);
        res.status(201).json({ status: 'success', data: item });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// Obtener carrito del usuario
const getCarritoByUsuario = async (req, res) => {
    try {
        const items = await carritoService.getCarritoByUsuario(req.params.userId);
        res.json({ status: 'success', data: items });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Obtener todos los carritos (admin)
const getAllCarritos = async (req, res) => {
    try {
        const carritos = await carritoService.getAllCarritos();
        res.json({ status: 'success', data: carritos });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Obtener item por ID
const getCarritoItem = async (req, res) => {
    try {
        const item = await carritoService.getCarritoById(req.params.id);
        if (!item) {
            return res.status(404).json({ status: 'error', message: 'Item no encontrado' });
        }
        res.json({ status: 'success', data: item });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// Actualizar cantidad
const updateCarritoItem = async (req, res) => {
    try {
        const item = await carritoService.updateCarrito(req.params.id, req.body);
        if (!item) {
            return res.status(404).json({ status: 'error', message: 'Item no encontrado' });
        }
        res.json({ status: 'success', data: item });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// Eliminar item del carrito
const deleteCarritoItem = async (req, res) => {
    try {
        const item = await carritoService.deleteCarritoItem(req.params.id);
        if (!item) {
            return res.status(404).json({ status: 'error', message: 'Item no encontrado' });
        }
        res.json({ status: 'success', message: 'Item eliminado del carrito' });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// Vaciar carrito completo
const vaciarCarrito = async (req, res) => {
    try {
        await carritoService.vaciarCarrito(req.params.userId);
        res.json({ status: 'success', message: 'Carrito vaciado correctamente' });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    addToCarrito,
    getCarritoByUsuario,
    getAllCarritos,
    getCarritoItem,
    updateCarritoItem,
    deleteCarritoItem,
    vaciarCarrito
};
