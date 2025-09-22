const express = require('express');
const router = express.Router();
const { crearMembresiaMes, listarMembresiasMes } = require('../controllers/membresiasController');

router.post('/mes', crearMembresiaMes);
router.get('/mes', listarMembresiasMes);

module.exports = router;