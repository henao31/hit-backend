const { query } = require('../config/database');

async function crearReporte(req, res) {
  const { id_gimnasio /*, otros campos si tienes */ } = req.body;
  try {
    await query(
      `INSERT INTO reporte (id_gimnasio /*, otros campos */) VALUES (?)`,
      [id_gimnasio /*, otros valores */]
    );
    res.status(201).json({ mensaje: 'Reporte creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function listarReportes(req, res) {
  try {
    const reportes = await query('SELECT * FROM reporte');
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { crearReporte, listarReportes };