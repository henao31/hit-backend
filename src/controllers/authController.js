const authService = require('../services/authService');

class AuthController {
  /**
   * Registra un nuevo usuario
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async register(req, res) {
    try {
      const { correo, contrasena, nombre, direccion, telefono } = req.body;

      // Llamar al servicio para registrar el usuario
      const newUser = await authService.register({ correo, contrasena, nombre, direccion, telefono });

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: newUser
      });

    } catch (error) {
      console.error('Error en register:', error.message);
      
      res.status(400).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  /**
   * Autentica un usuario existente
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async login(req, res) {
    try {
      const { correo, contrasena } = req.body;

      // Llamar al servicio para autenticar
      const result = await authService.login({ correo, contrasena });

      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: result
      });

    } catch (error) {
      console.error('Error en login:', error.message);
      
      res.status(401).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  /**
   * Obtiene un usuario por ID
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const userId = parseInt(id);

      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          message: 'ID de usuario inválido',
          data: null
        });
      }

      const user = await authService.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
          data: null
        });
      }

      res.status(200).json({
        success: true,
        message: 'Usuario obtenido exitosamente',
        data: user
      });

    } catch (error) {
      console.error('Error en getUserById:', error.message);
      
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        data: null
      });
    }
  }

  /**
   * Obtiene todos los usuarios (solo para desarrollo)
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async getAllUsers(req, res) {
    try {
      const users = await authService.getAllUsers();

      res.status(200).json({
        success: true,
        message: 'Usuarios obtenidos exitosamente',
        data: users
      });

    } catch (error) {
      console.error('Error en getAllUsers:', error.message);
      
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        data: null
      });
    }
  }

  // Función de verificación de token eliminada - ya no se usa JWT
}

module.exports = new AuthController();
