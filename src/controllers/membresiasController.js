const { query } = require('../config/database');

async function crearMembresiaMes(req, res) {
  const { precio, beneficios, id_usuario, fecha_inicio, fecha_fin, id_gimnasio } = req.body;
  try {
    await query(
      `INSERT INTO membresia_mes (precio, beneficios, id_usuario, fecha_inicio, fecha_fin, id_gimnasio)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [precio, beneficios, id_usuario, fecha_inicio, fecha_fin, id_gimnasio]
    );
    res.status(201).json({ mensaje: 'Membresía mensual creada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function listarMembresiasMes(req, res) {
  try {
    const membresias = await query('SELECT * FROM membresia_mes');
    res.json(membresias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { crearMembresiaMes, listarMembresiasMes };