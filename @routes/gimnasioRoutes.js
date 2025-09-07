const express = require('express');
const gimnasioController = require('../src/controllers/gimnasioController');

const router = express.Router();

// Rutas para gimnasios
router.post('/', gimnasioController.createGimnasio);
router.get('/', gimnasioController.getAllGimnasios);
router.get('/:id', gimnasioController.getGimnasioById);
router.put('/:id', gimnasioController.updateGimnasio);
router.delete('/:id', gimnasioController.deleteGimnasio);

// Ruta para login de gimnasio
router.post('/login', gimnasioController.loginGimnasio);

module.exports = router;
