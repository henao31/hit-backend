const express = require('express');
const accessController = require('../controllers/accessController');

const router = express.Router();

// Rutas de autenticación
router.post('/create', accessController.createAccess);
router.get('/', accessController.getAllAccess);

module.exports = router;
