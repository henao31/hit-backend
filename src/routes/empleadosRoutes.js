const express = require('express');
const router = express.Router();
const { crearEmpleado, listarEmpleados } = require('../controllers/empleadosController');

router.post('/', crearEmpleado);
router.get('/', listarEmpleados);

module.exports = router;