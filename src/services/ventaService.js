const Venta = require('../models/venta');

const createVenta = async (ventaData) => {
  const newVenta = new Venta(ventaData);
  return await newVenta.save();
};

const getVentas = async (filter = {}) => {
  return await Venta.find(filter);
};

const getVentaById = async (id) => {
  return await Venta.findById(id);
};

const updateVenta = async (id, updateData) => {
  return await Venta.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

const deleteVenta = async (id) => {
  return await Venta.findByIdAndDelete(id);
};

module.exports = {
  createVenta,
  getVentas,
  getVentaById,
  updateVenta,
  deleteVenta
};
