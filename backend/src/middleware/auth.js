const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación JWT
 * Verifica el token en el header Authorization
 */
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Acceso no autorizado. Token requerido.'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado.'
    });
  }
};

/**
 * Middleware opcional de autenticación
 * Permite acceso sin token, pero adjunta userId si existe
 */
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
    }
    next();
  } catch (error) {
    next();
  }
};

module.exports = { auth, optionalAuth };
