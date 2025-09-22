const express = require('express');
const router = express.Router();
const { crearUsuario, listarUsuarios } = require('../controllers/usuariosController');

router.post('/', crearUsuario);
router.get('/', listarUsuarios);

module.exports = router;