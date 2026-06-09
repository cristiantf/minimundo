const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Registrar un nuevo perfil de niño
 * POST /api/auth/register
 */
const register = async (req, res, next) => {
  try {
    const { name, age, avatar } = req.body;

    if (!name || !age) {
      return res.status(400).json({
        success: false,
        message: 'El nombre y la edad son obligatorios.'
      });
    }

    const user = await User.create({
      name,
      age: parseInt(age),
      avatar: avatar || 'default'
    });

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: '¡Bienvenido a MiniMundo!',
      data: { user, token }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener perfil del niño
 * GET /api/auth/profile/:id
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado.'
      });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar perfil del niño
 * PUT /api/auth/profile/:id
 */
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado.'
      });
    }

    const { name, avatar, age } = req.body;
    await user.update({ name, avatar, age });

    res.json({
      success: true,
      message: 'Perfil actualizado.',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, getProfile, updateProfile };
