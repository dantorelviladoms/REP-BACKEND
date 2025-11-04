const vehiculoService = require('../services/vehiculoService');

// Crear un vehículo
const createVehiculo = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.createVehiculo(req.body);
    res.status(201).json({ status: 'success', data: vehiculo });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Obtener todos los vehículos
const getVehiculos = async (req, res) => {
  try {
    const vehiculos = await vehiculoService.getVehiculos();
    res.json({ status: 'success', data: vehiculos });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Obtener un vehículo por ID
const getVehiculo = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.getVehiculoById(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ status: 'error', message: 'Vehículo no encontrado' });
    }
    res.json({ status: 'success', data: vehiculo });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Actualizar un vehículo
const updateVehiculo = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.updateVehiculo(req.params.id, req.body);
    if (!vehiculo) {
      return res.status(404).json({ status: 'error', message: 'Vehículo no encontrado' });
    }
    res.json({ status: 'success', data: vehiculo });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Eliminar un vehículo
const deleteVehiculo = async (req, res) => {
  try {
    const vehiculo = await vehiculoService.deleteVehiculo(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ status: 'error', message: 'Vehículo no encontrado' });
    }
    res.json({ status: 'success', message: 'Vehículo eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Exportamos todas las funciones
module.exports = {
  createVehiculo,
  getVehiculos,
  getVehiculo,
  updateVehiculo,
  deleteVehiculo
};
