const User = require('../models/user');

// Crear un usuario
const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

// Obtener todos los usuarios (con filtro opcional)
const getUsers = async (filter = {}) => {
  return await User.find(filter);
};

// Obtener un usuario por ID
const getUserById = async (id) => {
  return await User.findById(id);
};

// Actualizar un usuario por ID
const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

// Eliminar un usuario por ID
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
