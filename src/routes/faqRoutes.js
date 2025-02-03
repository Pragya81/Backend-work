const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const faqRoutes = require('../routes/faqRoutes');

// Get all FAQs
router.get('/faqs', faqController.getFAQs);
router.post('/faqs', faqController.addFAQ);
router.put('/faqs/:id', faqController.updateFAQ);
// New Routes for cache operations
router.get('/cache/exists', faqController.checkCacheExists); // Check if cache exists
router.get('/cache/view', faqController.viewCacheData); // View cached data
router.delete('/cache/delete', faqController.deleteCacheData); // Delete cached data
router.post('/faqs', addFAQ); // Ensure this exists

module.exports = router;