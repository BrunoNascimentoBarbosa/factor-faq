const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !user.isActive) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const token = this.generateToken(user._id);
    const refreshToken = this.generateRefreshToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token,
      refreshToken
    };
  }

  async register(userData) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const user = new User(userData);
    await user.save();

    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }

  generateToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
  }

  generateRefreshToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRE }
    );
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = new AuthService();
