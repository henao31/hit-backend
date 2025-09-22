const { query } = require('../config/database');

async function crearEmpleado(req, res) {
  const { nombre, cedula, fecha_nacimiento, correo, salario, horario, id_cargo, id_gimnasio } = req.body;
  try {
    await query(
      `INSERT INTO empleado (nombre, cedula, fecha_nacimiento, correo, salario, horario, id_cargo, id_gimnasio)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, cedula, fecha_nacimiento, correo, salario, horario, id_cargo, id_gimnasio]
    );
    res.status(201).json({ mensaje: 'Empleado creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function listarEmpleados(req, res) {
  try {
    const empleados = await query('SELECT * FROM empleado');
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { crearEmpleado, listarEmpleados };