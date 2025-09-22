const express = require('express');
const router = express.Router();
const { crearReporte, listarReportes } = require('../controllers/reportesController');

router.post('/', crearReporte);
router.get('/', listarReportes);

module.exports = router;