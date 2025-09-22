const { query } = require('../config/database');

async function crearMovimiento(req, res) {
  const { /* agrega los campos necesarios, por ejemplo: */ id_gimnasio, /* ...otros */ } = req.body;
  try {
    await query(
      `INSERT INTO caja_movimiento (id_gimnasio /*, otros campos */) VALUES (?)`,
      [id_gimnasio /*, otros valores */]
    );
    res.status(201).json({ mensaje: 'Movimiento de caja creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function listarMovimientos(req, res) {
  try {
    const movimientos = await query('SELECT * FROM caja_movimiento');
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { crearMovimiento, listarMovimientos };