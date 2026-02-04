const Carrito = require('../models/carrito');

// Añadir producto al carrito
const addToCarrito = async (carritoData) => {
    // Verificar si ya existe este vehículo en el carrito del usuario
    const existente = await Carrito.findOne({
        id_usuario: carritoData.id_usuario,
        id_vehiculo: carritoData.id_vehiculo
    });

    if (existente) {
        // Si ya existe, incrementar cantidad
        existente.cantidad += 1;
        return await existente.save();
    }

    // Si no existe, crear nuevo item
    const newItem = new Carrito(carritoData);
    return await newItem.save();
};

// Obtener carrito de un usuario
const getCarritoByUsuario = async (userId) => {
    return await Carrito.find({ id_usuario: userId })
        .populate('id_vehiculo')
        .sort({ fecha_agregado: -1 });
};

// Obtener todos los carritos (admin)
const getAllCarritos = async () => {
    return await Carrito.find()
        .populate('id_usuario')
        .populate('id_vehiculo');
};

// Obtener item del carrito por ID
const getCarritoById = async (id) => {
    return await Carrito.findById(id)
        .populate('id_vehiculo');
};

// Actualizar cantidad en el carrito
const updateCarrito = async (id, updateData) => {
    return await Carrito.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    }).populate('id_vehiculo');
};

// Eliminar item del carrito
const deleteCarritoItem = async (id) => {
    return await Carrito.findByIdAndDelete(id);
};

// Vaciar carrito de un usuario
const vaciarCarrito = async (userId) => {
    return await Carrito.deleteMany({ id_usuario: userId });
};

module.exports = {
    addToCarrito,
    getCarritoByUsuario,
    getAllCarritos,
    getCarritoById,
    updateCarrito,
    deleteCarritoItem,
    vaciarCarrito
};
