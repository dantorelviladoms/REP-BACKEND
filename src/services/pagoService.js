const Pago = require('../models/pago');

const createPago = async (pagoData) => {
  const newPago = new Pago(pagoData);
  return await newPago.save();
};

const getPagos = async (filter = {}) => {
  return await Pago.find(filter);
};

const getPagoById = async (id) => {
  return await Pago.findById(id);
};

const updatePago = async (id, updateData) => {
  return await Pago.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

const deletePago = async (id) => {
  return await Pago.findByIdAndDelete(id);
};

module.exports = {
  createPago,
  getPagos,
  getPagoById,
  updatePago,
  deletePago
};
