const express = require('express');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { authValidator } = require('../validators/authValidator');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/login', authLimiter, validate(authValidator.login), authController.login);
router.post('/register', validate(authValidator.register), authController.register);
router.get('/me', authMiddleware, authController.getCurrentUser);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
