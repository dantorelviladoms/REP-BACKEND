const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar usuario (con validación de email único)
const registrarUser = async ({ nombre, apellido, email, telefono, username, password, rol }) => {
  // comprobar si el email ya existe
  const existe = await User.findOne({ email });
  if (existe) throw new Error('El email ya está en uso');

  // crear nuevo usuario
  const nuevoUsuario = new User({ nombre, apellido, email, telefono, username, password, rol });
  await nuevoUsuario.save();

  return { message: 'Usuario registrado !!!' };
};

// Login usuario (comparar contraseña y generar token)
const loginUser = async ({ email, password }) => {
  const usuario = await User.findOne({ email });
  if (!usuario) throw new Error('Usuario no encontrado');

  const esValido = await usuario.compararPassword(password);
  if (!esValido) throw new Error('Credenciales incorrectas');

  // generar token JWT
  const token = jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.JWT_SECRET, // clave secreta en el .env
    { expiresIn: '1h' }
  );

  return { message: 'Login correcto!', token };
};

// Crear un usuario (CRUD genérico, sin login/registro)
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
  registrarUser,
  loginUser,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
