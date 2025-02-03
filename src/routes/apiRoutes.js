const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Route for receiving data
router.post('/data', dataController.receiveData);

module.exports = router;