const { query } = require('../config/database');

// Crear usuario
async function crearUsuario(req, res) {
  const { nombre, cedula, fecha_nacimiento, telefono, objetivo, id_gimnasio } = req.body;
  try {
    await query(
      `INSERT INTO usuario (nombre, cedula, fecha_nacimiento, telefono, objetivo, id_gimnasio)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, cedula, fecha_nacimiento, telefono, objetivo, id_gimnasio]
    );
    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Listar usuarios
async function listarUsuarios(req, res) {
  try {
    const usuarios = await query('SELECT * FROM usuario');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { crearUsuario, listarUsuarios };