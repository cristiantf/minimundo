/**
 * Middleware de manejo de errores global
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // Errores de validación de Sequelize
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors
    });
  }

  // Errores de restricción única
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      message: 'El registro ya existe'
    });
  }

  // Error genérico
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  });
};

module.exports = errorHandler;
