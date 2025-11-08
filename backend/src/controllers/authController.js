const authService = require('../services/authService');
const User = require('../models/User');

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      return res.status(200).json({
        success: true,
        data: result,
        message: 'Login realizado com sucesso'
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message || 'Erro ao fazer login'
      });
    }
  }

  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);

      return res.status(201).json({
        success: true,
        data: result,
        message: 'Usuário registrado com sucesso'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Erro ao registrar usuário'
      });
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
      });

      return res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {
    return res.status(200).json({
      success: true,
      message: 'Logout realizado com sucesso'
    });
  }
}

module.exports = new AuthController();
