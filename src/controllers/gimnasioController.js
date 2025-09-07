const gimnasioService = require('../services/gimnasioService');

class GimnasioController {
  /**
   * Crea un nuevo gimnasio
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async createGimnasio(req, res) {
    try {
      const { nombre, direccion, telefono, correo, contrasena } = req.body;

      // Validar que se envíen todos los campos requeridos
      if (!nombre || !correo || !contrasena) {
        return res.status(400).json({
          success: false,
          message: 'Nombre, correo y contraseña son requeridos',
          data: null
        });
      }

      // Llamar al servicio para crear el gimnasio
      const newGimnasio = await gimnasioService.createGimnasio({
        nombre,
        direccion,
        telefono,
        correo,
        contrasena
      });

      res.status(201).json({
        success: true,
        message: 'Gimnasio registrado exitosamente',
        data: newGimnasio
      });

    } catch (error) {
      console.error('Error en createGimnasio:', error.message);
      
      res.status(400).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  /**
   * Obtiene todos los gimnasios
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async getAllGimnasios(req, res) {
    try {
      const gimnasios = await gimnasioService.getAllGimnasios();

      res.status(200).json({
        success: true,
        message: 'Gimnasios obtenidos exitosamente',
        data: gimnasios
      });

    } catch (error) {
      console.error('Error en getAllGimnasios:', error.message);
      
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        data: null
      });
    }
  }

  /**
   * Obtiene un gimnasio por ID
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async getGimnasioById(req, res) {
    try {
      const { id } = req.params;
      const gimnasioId = parseInt(id);

      if (isNaN(gimnasioId)) {
        return res.status(400).json({
          success: false,
          message: 'ID de gimnasio inválido',
          data: null
        });
      }

      const gimnasio = await gimnasioService.getGimnasioById(gimnasioId);

      if (!gimnasio) {
        return res.status(404).json({
          success: false,
          message: 'Gimnasio no encontrado',
          data: null
        });
      }

      res.status(200).json({
        success: true,
        message: 'Gimnasio obtenido exitosamente',
        data: gimnasio
      });

    } catch (error) {
      console.error('Error en getGimnasioById:', error.message);
      
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        data: null
      });
    }
  }

  /**
   * Actualiza un gimnasio
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async updateGimnasio(req, res) {
    try {
      const { id } = req.params;
      const gimnasioId = parseInt(id);
      const updateData = req.body;

      if (isNaN(gimnasioId)) {
        return res.status(400).json({
          success: false,
          message: 'ID de gimnasio inválido',
          data: null
        });
      }

      // Llamar al servicio para actualizar
      const updatedGimnasio = await gimnasioService.updateGimnasio(gimnasioId, updateData);

      res.status(200).json({
        success: true,
        message: 'Gimnasio actualizado exitosamente',
        data: updatedGimnasio
      });

    } catch (error) {
      console.error('Error en updateGimnasio:', error.message);
      
      const statusCode = error.message.includes('no encontrado') ? 404 : 400;
      
      res.status(statusCode).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  /**
   * Elimina un gimnasio
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async deleteGimnasio(req, res) {
    try {
      const { id } = req.params;
      const gimnasioId = parseInt(id);

      if (isNaN(gimnasioId)) {
        return res.status(400).json({
          success: false,
          message: 'ID de gimnasio inválido',
          data: null
        });
      }

      await gimnasioService.deleteGimnasio(gimnasioId);

      res.status(200).json({
        success: true,
        message: 'Gimnasio eliminado exitosamente',
        data: null
      });

    } catch (error) {
      console.error('Error en deleteGimnasio:', error.message);
      
      const statusCode = error.message.includes('no encontrado') ? 404 : 400;
      
      res.status(statusCode).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  /**
   * Autentica un gimnasio
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async loginGimnasio(req, res) {
    try {
      const { correo, contrasena } = req.body;

      // Validar que se envíen las credenciales
      if (!correo || !contrasena) {
        return res.status(400).json({
          success: false,
          message: 'Correo y contraseña son requeridos',
          data: null
        });
      }

      // Llamar al servicio para autenticar
      const result = await gimnasioService.loginGimnasio({ correo, contrasena });

      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: result
      });

    } catch (error) {
      console.error('Error en loginGimnasio:', error.message);
      
      res.status(401).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  // Función de perfil eliminada - ya no se usa autenticación con tokens
}

module.exports = new GimnasioController();
