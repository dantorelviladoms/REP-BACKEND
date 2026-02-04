const ventaService = require('../services/ventaService');

// Crear una venta
const createVenta = async (req, res) => {
  try {
    const venta = await ventaService.createVenta(req.body);
    res.status(201).json({ status: 'success', data: venta });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Obtener todas las ventas
const getVentas = async (req, res) => {
  try {
    const ventas = await ventaService.getVentas();
    res.json({ status: 'success', data: ventas });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Obtener una venta por ID
const getVenta = async (req, res) => {
  try {
    const venta = await ventaService.getVentaById(req.params.id);
    if (!venta) {
      return res.status(404).json({ status: 'error', message: 'Venta no encontrada' });
    }
    res.json({ status: 'success', data: venta });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Actualizar una venta
const updateVenta = async (req, res) => {
  try {
    const venta = await ventaService.updateVenta(req.params.id, req.body);
    if (!venta) {
      return res.status(404).json({ status: 'error', message: 'Venta no encontrada' });
    }
    res.json({ status: 'success', data: venta });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Eliminar una venta
const deleteVenta = async (req, res) => {
  try {
    const venta = await ventaService.deleteVenta(req.params.id);
    if (!venta) {
      return res.status(404).json({ status: 'error', message: 'Venta no encontrada' });
    }
    res.json({ status: 'success', message: 'Venta eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Obtener ventas por usuario (carrito)
const getVentasByUsuario = async (req, res) => {
  try {
    const ventas = await ventaService.getVentasByUsuario(req.params.userId);
    res.json({ status: 'success', data: ventas });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createVenta,
  getVentas,
  getVenta,
  updateVenta,
  deleteVenta,
  getVentasByUsuario
};
