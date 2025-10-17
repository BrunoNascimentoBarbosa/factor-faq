const express = require('express');
const faqRoutes = require('./faqRoutes');
const authRoutes = require('./authRoutes');
const categoryRoutes = require('./categoryRoutes');

const router = express.Router();

router.use('/faqs', faqRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
