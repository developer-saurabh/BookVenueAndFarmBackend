const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

// Example: protect this with an isSuperAdmin middleware in production
router.post('/register', vendorController.registerVendor);
router.post('/login', vendorController.loginVendor);

module.exports = router;
    