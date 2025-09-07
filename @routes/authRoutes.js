const express = require('express');
const authController = require('../src/controllers/authController');

const router = express.Router();

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
