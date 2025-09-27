const { query } = require('../config/database');


async function createAccess(req, res) {
  const { id_gimnasio, cedula } = req.body;

  try {
    // Primero buscar el ID del usuario por cédula
    const usuario = await query('SELECT id_usuario FROM usuario WHERE cedula = ?', [cedula]);
    
    if (usuario.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado con esa cédula',
        data: null
      });
    }

    const id_usuario = usuario[0].id_usuario;

    // Ahora insertar el acceso con el ID correcto del usuario
    const acceso = await query('INSERT INTO acceso (id_gimnasio, id_usuario) VALUES (?, ?)', 
        [id_gimnasio, id_usuario]);
        
    res.status(201).json({
        success: true,
        message: 'Acceso creado correctamente',
        data: {
          id_acceso: acceso.insertId,
          id_gimnasio: id_gimnasio,
          id_usuario: id_usuario
        }
      });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
  }
}

async function getAllAccess(req, res) {
  try {
    // Consulta para obtener todos los accesos con información del usuario y gimnasio
    const accesos = await query(`
      SELECT 
        a.id_acceso,
        a.fecha_hora,
        u.nombre as nombre_usuario,
        u.cedula as cedula_usuario,
        g.nombre as nombre_gimnasio
      FROM acceso a
      INNER JOIN usuario u ON a.id_usuario = u.id_usuario
      INNER JOIN gimnasio g ON a.id_gimnasio = g.id_gimnasio
      ORDER BY a.fecha_hora DESC
    `);
    
    res.status(200).json({
        success: true,
        message: 'Accesos obtenidos correctamente',
        data: accesos
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createAccess, getAllAccess };