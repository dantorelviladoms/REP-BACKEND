const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado o formato inválido' });
    }

    const token = authHeader.split(' ')[1];
    
    // Validar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    
    // Obtener información del usuario
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;
