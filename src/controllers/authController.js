const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
const register = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, username, password, rol } = req.body;
    
    // Verificar si el email ya existe
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ status: 'error', message: 'El email ya está en uso' });

    // Crear nuevo usuario. La contraseña se hashea automáticamente en el pre("save") del modelo
    const nuevoUsuario = new User({ nombre, apellido, email, telefono, username, password, rol });
    await nuevoUsuario.save();

    res.status(201).json({ status: 'success', message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Login usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(400).json({ status: 'error', message: 'Usuario no encontrado' });

    // Comparar contraseña
    const esValido = await usuario.compararPassword(password);
    if (!esValido) return res.status(400).json({ status: 'error', message: 'Credenciales incorrectas' });

    // Generar Access Token (corto, ej. 15m)
    const accessToken = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET || 'secret_key', 
      { expiresIn: '15m' }
    );

    // Generar Refresh Token (largo, ej. 7d)
    const refreshToken = jwt.sign(
      { id: usuario._id },
      process.env.JWT_REFRESH_SECRET || 'refresh_secret_key',
      { expiresIn: '7d' }
    );

    // Guardar Refresh Token en la base de datos
    usuario.refreshToken = refreshToken;
    await usuario.save();

    res.status(200).json({ 
      status: 'success', 
      message: 'Login correcto', 
      accessToken, 
      refreshToken 
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Refresh Token
const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ status: 'error', message: 'Refresh token requerido' });

    // Validar el token
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret_key');

    // Buscar al usuario y comprobar que el token coincide con el guardado
    const usuario = await User.findById(payload.id);
    if (!usuario || usuario.refreshToken !== refreshToken) {
      return res.status(403).json({ status: 'error', message: 'Refresh token inválido' });
    }

    // Generar nuevo Access Token
    const nuevoAccessToken = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET || 'secret_key', 
      { expiresIn: '15m' }
    );

    res.status(200).json({ status: 'success', accessToken: nuevoAccessToken });
  } catch (error) {
    res.status(403).json({ status: 'error', message: 'Refresh token expirado o inválido' });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ status: 'error', message: 'Refresh token requerido' });

    // Buscar al usuario con este token y eliminarlo
    const usuario = await User.findOne({ refreshToken });
    if (usuario) {
      usuario.refreshToken = null;
      await usuario.save();
    }

    res.status(200).json({ status: 'success', message: 'Logout correcto' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { register, login, refresh, logout };
