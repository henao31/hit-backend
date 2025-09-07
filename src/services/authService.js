const db = require('../config/database');

class AuthService {
  constructor() {
    // Constructor simplificado sin JWT
  }

  /**
   * Registra un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @param {string} userData.correo - Email del usuario
   * @param {string} userData.contrasena - Contraseña del usuario
   * @param {string} userData.name - Nombre del usuario
   * @returns {Promise<Object>} - Usuario creado
   */
  async register(userData) {
    const {correo, contrasena, nombre, direccion, telefono} = userData;

    // Verificar si el usuario ya existe
    const existingUsers = await db.query('SELECT id_gimnasio FROM gimnasio WHERE correo = ?', [correo]);
    if (existingUsers.length > 0) {
      throw new Error('El usuario ya existe con este correo');
    }

    try {
      // Insertar nuevo usuario en la base de datos
      const result = await db.query(
        'INSERT INTO gimnasio (correo, contrasena, nombre, direccion, telefono) VALUES (?, ?, ?, ?, ?)',
        [correo, contrasena, nombre, direccion, telefono]
      );

      // Obtener el usuario creado
      const newUser = await db.query(
        'SELECT id_gimnasio, correo, contrasena, nombre, direccion, telefono FROM gimnasio WHERE id_gimnasio = ?',
        [result.insertId]
      );

      return newUser[0];

    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error.message);
    }
  }

  /**
   * Autentica un usuario existente
   * @param {Object} credentials - Credenciales de login
   * @param {string} credentials.correo - Email del usuario
   * @param {string} credentials.contrasena - Contraseña del usuario
   * @returns {Promise<Object>} - Token y datos del usuario
   */
  async login(credentials) {
    const { correo, contrasena } = credentials;

    try {
      // Buscar usuario por correo
      const users = await db.query(
        'SELECT id_gimnasio, correo, contrasena, nombre, direccion, telefono FROM gimnasio WHERE correo = ?',
        [correo]
      );

      if (users.length === 0) {
        throw new Error('Credenciales inválidas');
      }

      const user = users[0];

      // Verificar contraseña (comparación directa sin encriptar)
      if (contrasena !== user.contrasena) {
        throw new Error('Credenciales inválidas');
      }

      // Retornar datos del usuario (sin contraseña)
      const { contrasena: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword
      };

    } catch (error) {
      throw new Error('Error al autenticar: ' + error.message);
    }
  }

  // Función de verificación eliminada - ya no se usa JWT

  /**
   * Obtiene un usuario por ID
   * @param {string} userId - ID del usuario
   * @returns {Promise<Object|null>} - Usuario encontrado o null
   */
  async getUserById(userId) {
    try {
      const users = await db.query(
        'SELECT id_gimnasio, correo, nombre FROM gimnasio WHERE id_gimnasio = ?',
        [userId]
      );
      
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error.message);
      return null;
    }
  }

  /**
   * Obtiene todos los usuarios (solo para desarrollo)
   * @returns {Promise<Array>} - Lista de usuarios sin contraseñas
   */
  async getAllUsers() {
    try {
      const users = await db.query(
        'SELECT id_gimnasio, correo, nombre FROM gimnasio ORDER BY created_at DESC'
      );
      return users;
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error.message);
      return [];
    }
  }
}

module.exports = new AuthService();
