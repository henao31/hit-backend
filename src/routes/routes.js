const membresiasRoutes = require('./membresiasRoutes');
const empleadosRoutes = require('./empleadosRoutes');
const reportesRoutes = require('./reportesRoutes');
const usuariosRoutes = require('./usuariosRoutes');
const cajaRoutes = require('./cajaRoutes');
const authRoutes = require('./authRoutes');
const accessRoutes = require('./accessRoutes');
const express = require('express');
const app = express();

// rutas de auth
app.use('/auth', authRoutes);
// rutas de access
app.use('/access', accessRoutes);
//rutas de usuarios
app.use('/usuarios', usuariosRoutes);
// rutas de empleados
app.use('/empleados', empleadosRoutes);
// ruta de caja
app.use('/caja', cajaRoutes);
// rutas de membresias
app.use('/membresias', membresiasRoutes);
// rutas de reportes
app.use('/reportes', reportesRoutes);


module.exports = app;