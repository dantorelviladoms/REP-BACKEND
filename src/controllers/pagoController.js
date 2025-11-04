const pagoService = require('../services/pagoService');

// Crear un pago
const createPago = async (req, res) => {
  try {
    const pago = await pagoService.createPago(req.body);
    res.status(201).json({ status: 'success', data: pago });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Obtener todos los pagos
const getPagos = async (req, res) => {
  try {
    const pagos = await pagoService.getPagos();
    res.json({ status: 'success', data: pagos });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Obtener un pago por ID
const getPago = async (req, res) => {
  try {
    const pago = await pagoService.getPagoById(req.params.id);
    if (!pago) {
      return res.status(404).json({ status: 'error', message: 'Pago no encontrado' });
    }
    res.json({ status: 'success', data: pago });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Actualizar un pago
const updatePago = async (req, res) => {
  try {
    const pago = await pagoService.updatePago(req.params.id, req.body);
    if (!pago) {
      return res.status(404).json({ status: 'error', message: 'Pago no encontrado' });
    }
    res.json({ status: 'success', data: pago });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Eliminar un pago
const deletePago = async (req, res) => {
  try {
    const pago = await pagoService.deletePago(req.params.id);
    if (!pago) {
      return res.status(404).json({ status: 'error', message: 'Pago no encontrado' });
    }
    res.json({ status: 'success', message: 'Pago eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createPago,
  getPagos,
  getPago,
  updatePago,
  deletePago
};
