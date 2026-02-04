const Vehiculo = require('../models/vehiculo');

const createVehiculo = async (vehiculoData) => {
  const newVehiculo = new Vehiculo(vehiculoData);
  return await newVehiculo.save();
};

/*const getVehiculos = async (filter = {}) => {
  return await Vehiculo.find(filter);
};*/

const getVehiculos = async (filters = {}) => {
  // Construir la query de filtrado
  const query = {};

  // Filtro por marca (puede ser una o múltiples)
  if (filters.marca) {
    if (Array.isArray(filters.marca)) {
      query.marca = { $in: filters.marca };
    } else {
      query.marca = filters.marca;
    }
  }

  // Filtro por rango de precio
  if (filters.precioMin !== undefined || filters.precioMax !== undefined) {
    query.precio = {};
    if (filters.precioMin !== undefined) query.precio.$gte = Number(filters.precioMin);
    if (filters.precioMax !== undefined) query.precio.$lte = Number(filters.precioMax);
  }

  // Filtro por rango de potencia
  if (filters.potenciaMin !== undefined || filters.potenciaMax !== undefined) {
    query.potencia = {};
    if (filters.potenciaMin !== undefined) query.potencia.$gte = Number(filters.potenciaMin);
    if (filters.potenciaMax !== undefined) query.potencia.$lte = Number(filters.potenciaMax);
  }

  // Filtro por color (puede ser uno o múltiples)
  if (filters.color) {
    if (Array.isArray(filters.color)) {
      query.color = { $in: filters.color };
    } else {
      query.color = filters.color;
    }
  }

  // Construir el objeto de ordenación
  let sort = {};
  if (filters.sortBy) {
    const order = filters.sortOrder === 'desc' ? -1 : 1;
    sort[filters.sortBy] = order;
  }

  return await Vehiculo.find(query).sort(sort);
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