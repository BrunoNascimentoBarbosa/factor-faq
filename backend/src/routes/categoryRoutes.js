const express = require('express');
const categoryController = require('../controllers/categoryController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { categoryValidator } = require('../validators/categoryValidator');

const router = express.Router();

// Rotas públicas
router.get('/', categoryController.getAll);
router.get('/counts', categoryController.getCounts);

// Rotas admin (protegidas)
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validate(categoryValidator.create),
  categoryController.create
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validate(categoryValidator.update),
  categoryController.update
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  categoryController.delete
);

module.exports = router;
