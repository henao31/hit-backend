const express = require('express');

// Importar todas las rutas
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const gimnasioRoutes = require('./gimnasioRoutes');

const router = express.Router();

// Agrupar todas las rutas con sus prefijos
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/gimnasios', gimnasioRoutes);

module.exports = router;
