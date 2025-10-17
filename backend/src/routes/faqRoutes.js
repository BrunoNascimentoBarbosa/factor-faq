const express = require('express');
const faqController = require('../controllers/faqController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { faqValidator } = require('../validators/faqValidator');

const router = express.Router();

// Rotas públicas
router.get('/', faqController.getAll);
router.get('/:id', faqController.getById);
router.post('/:id/vote', faqController.vote);

// Rotas admin (protegidas)
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validate(faqValidator.create),
  faqController.create
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validate(faqValidator.update),
  faqController.update
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  faqController.delete
);

module.exports = router;
