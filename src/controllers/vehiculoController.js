const vehiculoService = require('../services/vehiculoService');

// Crear un vehículo
const createVehiculo = async (req, res) => {
  try {
    req.log.info({ body: req.body }, 'Creating new vehicle');
    const vehiculo = await vehiculoService.createVehiculo(req.body);
    req.log.info({ vehiculoId: vehiculo._id }, 'Vehicle created successfully');
    res.status(201).json({ status: 'success', data: vehiculo });
  } catch (error) {
    req.log.error({ error: error.message }, 'Error creating vehicle');
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Obtener todos los vehículos
const getVehiculos = async (req, res) => {
  try {
    // Extraer parámetros de query
    const filters = {
      marca: req.query.marca,
      precioMin: req.query.precioMin,
      precioMax: req.query.precioMax,
      potenciaMin: req.query.potenciaMin,
      potenciaMax: req.query.potenciaMax,
      color: req.query.color,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder
    };

    req.log.info({ filters }, 'Fetching vehicles list');
    const vehiculos = await vehiculoService.getVehiculos(filters);
    res.json({ status: 'success', data: vehiculos });
  } catch (error) {
    req.log.error({ error: error.message }, 'Error fetching vehicles');
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Obtener un vehículo por ID
const getVehiculo = async (req, res) => {
  try {
    req.log.info({ vehiculoId: req.params.id }, 'Fetching vehicle details');
    const vehiculo = await vehiculoService.getVehiculoById(req.params.id);
    if (!vehiculo) {
      req.log.warn({ vehiculoId: req.params.id }, 'Vehicle not found');
      return res.status(404).json({ status: 'error', message: 'Vehículo no encontrado' });
    }
    res.json({ status: 'success', data: vehiculo });
  } catch (error) {
    req.log.error({ vehiculoId: req.params.id, error: error.message }, 'Error fetching vehicle details');
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Actualizar un vehículo
const updateVehiculo = async (req, res) => {
  try {
    req.log.info({ vehiculoId: req.params.id, body: req.body }, 'Updating vehicle');
    const vehiculo = await vehiculoService.updateVehiculo(req.params.id, req.body);
    if (!vehiculo) {
      req.log.warn({ vehiculoId: req.params.id }, 'Vehicle to update not found');
      return res.status(404).json({ status: 'error', message: 'Vehículo no encontrado' });
    }
    req.log.info({ vehiculoId: vehiculo._id }, 'Vehicle updated successfully');
    res.json({ status: 'success', data: vehiculo });
  } catch (error) {
    req.log.error({ vehiculoId: req.params.id, error: error.message }, 'Error updating vehicle');
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Eliminar un vehículo
const deleteVehiculo = async (req, res) => {
  try {
    req.log.info({ vehiculoId: req.params.id }, 'Deleting vehicle');
    const vehiculo = await vehiculoService.deleteVehiculo(req.params.id);
    if (!vehiculo) {
      req.log.warn({ vehiculoId: req.params.id }, 'Vehicle to delete not found');
      return res.status(404).json({ status: 'error', message: 'Vehículo no encontrado' });
    }
    req.log.info({ vehiculoId: req.params.id }, 'Vehicle deleted successfully');
    res.json({ status: 'success', message: 'Vehículo eliminado correctamente' });
  } catch (error) {
    req.log.error({ vehiculoId: req.params.id, error: error.message }, 'Error deleting vehicle');
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
