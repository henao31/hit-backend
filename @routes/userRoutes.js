const express = require('express');
const authController = require('../src/controllers/authController');

const router = express.Router();

// Rutas de usuarios
router.get('/', authController.getAllUsers);
router.get('/:id', authController.getUserById);

module.exports = router;
