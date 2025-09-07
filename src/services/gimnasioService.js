const db = require('../config/database');

class GimnasioService {
  constructor() {
    // Constructor simplificado sin JWT
  }

  /**
   * Crea un nuevo gimnasio
   * @param {Object} gimnasioData - Datos del gimnasio
   * @param {string} gimnasioData.nombre - Nombre del gimnasio
   * @param {string} gimnasioData.direccion - Dirección del gimnasio
   * @param {string} gimnasioData.telefono - Teléfono del gimnasio
   * @param {string} gimnasioData.correo - Correo del gimnasio
   * @param {string} gimnasioData.contrasena - Contraseña del gimnasio
   * @returns {Promise<Object>} - Gimnasio creado
   */
  async createGimnasio(gimnasioData) {
    const { nombre, direccion, telefono, correo, contrasena } = gimnasioData;

    // Validar datos requeridos
    if (!nombre || !correo || !contrasena) {
      throw new Error('Nombre, correo y contraseña son requeridos');
    }

    // Verificar si el gimnasio ya existe por correo
    const existingGimnasios = await db.query('SELECT id_gimnasio FROM gimnasio WHERE correo = ?', [correo]);
    if (existingGimnasios.length > 0) {
      throw new Error('Ya existe un gimnasio con este correo');
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      throw new Error('El formato del correo no es válido');
    }

    // Validar longitud de contraseña
    if (contrasena.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    try {
      // Insertar nuevo gimnasio en la base de datos
      const result = await db.query(
        'INSERT INTO gimnasio (nombre, direccion, telefono, correo, contrasena) VALUES (?, ?, ?, ?, ?)',
        [nombre, direccion || null, telefono || null, correo, contrasena]
      );

      // Obtener el gimnasio creado
      const newGimnasio = await db.query(
        'SELECT id_gimnasio, nombre, direccion, telefono, correo FROM gimnasio WHERE id_gimnasio = ?',
        [result.insertId]
      );

      return newGimnasio[0];

    } catch (error) {
      throw new Error('Error al crear el gimnasio: ' + error.message);
    }
  }

  /**
   * Obtiene todos los gimnasios
   * @returns {Promise<Array>} - Lista de gimnasios
   */
  async getAllGimnasios() {
    try {
      const gimnasios = await db.query(
        'SELECT id_gimnasio, nombre, direccion, telefono, correo FROM gimnasio ORDER BY id_gimnasio DESC'
      );
      return gimnasios;
    } catch (error) {
      console.error('Error al obtener todos los gimnasios:', error.message);
      return [];
    }
  }

  /**
   * Obtiene un gimnasio por ID
   * @param {number} idGimnasio - ID del gimnasio
   * @returns {Promise<Object|null>} - Gimnasio encontrado o null
   */
  async getGimnasioById(idGimnasio) {
    try {
      const gimnasios = await db.query(
        'SELECT id_gimnasio, nombre, direccion, telefono, correo FROM gimnasio WHERE id_gimnasio = ?',
        [idGimnasio]
      );
      
      return gimnasios.length > 0 ? gimnasios[0] : null;
    } catch (error) {
      console.error('Error al obtener gimnasio por ID:', error.message);
      return null;
    }
  }

  /**
   * Actualiza un gimnasio
   * @param {number} idGimnasio - ID del gimnasio
   * @param {Object} updateData - Datos a actualizar
   * @returns {Promise<Object|null>} - Gimnasio actualizado o null
   */
  async updateGimnasio(idGimnasio, updateData) {
    const { nombre, direccion, telefono, correo, contrasena } = updateData;

    try {
      // Verificar que el gimnasio existe
      const existingGimnasio = await this.getGimnasioById(idGimnasio);
      if (!existingGimnasio) {
        throw new Error('Gimnasio no encontrado');
      }

      // Si se está actualizando el correo, verificar que no esté en uso por otro gimnasio
      if (correo && correo !== existingGimnasio.correo) {
        const emailExists = await db.query(
          'SELECT id_gimnasio FROM gimnasio WHERE correo = ? AND id_gimnasio != ?',
          [correo, idGimnasio]
        );
        if (emailExists.length > 0) {
          throw new Error('Ya existe un gimnasio con este correo');
        }
      }

      // Construir la consulta de actualización dinámicamente
      const updateFields = [];
      const updateValues = [];

      if (nombre !== undefined) {
        updateFields.push('nombre = ?');
        updateValues.push(nombre);
      }
      if (direccion !== undefined) {
        updateFields.push('direccion = ?');
        updateValues.push(direccion);
      }
      if (telefono !== undefined) {
        updateFields.push('telefono = ?');
        updateValues.push(telefono);
      }
      if (correo !== undefined) {
        updateFields.push('correo = ?');
        updateValues.push(correo);
      }
      if (contrasena !== undefined) {
        updateFields.push('contrasena = ?');
        updateValues.push(contrasena);
      }

      if (updateFields.length === 0) {
        throw new Error('No hay datos para actualizar');
      }

      updateValues.push(idGimnasio);

      await db.query(
        `UPDATE gimnasio SET ${updateFields.join(', ')} WHERE id_gimnasio = ?`,
        updateValues
      );

      // Obtener el gimnasio actualizado
      return await this.getGimnasioById(idGimnasio);

    } catch (error) {
      throw new Error('Error al actualizar el gimnasio: ' + error.message);
    }
  }

  /**
   * Elimina un gimnasio
   * @param {number} idGimnasio - ID del gimnasio
   * @returns {Promise<boolean>} - True si se eliminó correctamente
   */
  async deleteGimnasio(idGimnasio) {
    try {
      // Verificar que el gimnasio existe
      const existingGimnasio = await this.getGimnasioById(idGimnasio);
      if (!existingGimnasio) {
        throw new Error('Gimnasio no encontrado');
      }

      await db.query('DELETE FROM gimnasio WHERE id_gimnasio = ?', [idGimnasio]);
      return true;

    } catch (error) {
      throw new Error('Error al eliminar el gimnasio: ' + error.message);
    }
  }

  /**
   * Autentica un gimnasio
   * @param {Object} credentials - Credenciales de login
   * @param {string} credentials.correo - Correo del gimnasio
   * @param {string} credentials.contrasena - Contraseña del gimnasio
   * @returns {Promise<Object>} - Token y datos del gimnasio
   */
  async loginGimnasio(credentials) {
    const { correo, contrasena } = credentials;

    // Validar datos requeridos
    if (!correo || !contrasena) {
      throw new Error('Correo y contraseña son requeridos');
    }

    try {
      // Buscar gimnasio por correo
      const gimnasios = await db.query(
        'SELECT id_gimnasio, nombre, direccion, telefono, correo, contrasena FROM gimnasio WHERE correo = ?',
        [correo]
      );

      if (gimnasios.length === 0) {
        throw new Error('Credenciales inválidas');
      }

      const gimnasio = gimnasios[0];

      // Verificar contraseña (comparación directa sin encriptar)
      if (contrasena !== gimnasio.contrasena) {
        throw new Error('Credenciales inválidas');
      }

      // Retornar datos del gimnasio (sin contraseña)
      const { contrasena: _, ...gimnasioWithoutPassword } = gimnasio;
      return {
        gimnasio: gimnasioWithoutPassword
      };

    } catch (error) {
      throw new Error('Error al autenticar: ' + error.message);
    }
  }

  /**
   * Obtiene el perfil del gimnasio autenticado
   * @param {number} gimnasioId - ID del gimnasio
   * @returns {Promise<Object|null>} - Perfil del gimnasio
   */
  async getMyProfile(gimnasioId) {
    return await this.getGimnasioById(gimnasioId);
  }
}

module.exports = new GimnasioService();
