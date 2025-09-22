const express = require('express');
const router = express.Router();
const { crearMovimiento, listarMovimientos } = require('../controllers/cajaController');

router.post('/', crearMovimiento);
router.get('/', listarMovimientos);

module.exports = router;