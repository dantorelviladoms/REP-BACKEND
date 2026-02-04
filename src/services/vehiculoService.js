const Vehiculo = require('../models/vehiculo');

const createVehiculo = async (vehiculoData) => {
  const newVehiculo = new Vehiculo(vehiculoData);
  return await newVehiculo.save();
};

/*const getVehiculos = async (filter = {}) => {
  return await Vehiculo.find(filter);
};*/

const getVehiculos = async () => {
  return await Vehiculo.find();
};

const getVehiculoById = async (id) => {
  return await Vehiculo.findById(id);
};

const updateVehiculo = async (id, updateData) => {
  return await Vehiculo.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteVehiculo = async (id) => {
  return await Vehiculo.findByIdAndDelete(id);
};

module.exports = {
  createVehiculo,
  getVehiculos,
  getVehiculoById,
  updateVehiculo,
  deleteVehiculo
};