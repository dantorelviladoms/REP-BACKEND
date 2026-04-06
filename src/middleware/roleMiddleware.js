module.exports = (...roles) => {
  return (req, res, next) => {
    // req.user debe haber sido establecido previamente por authMiddleware
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ message: "Acceso prohibido" });
    }
    next();
  };
};
