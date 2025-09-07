const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Importar configuración
const { testConnection } = require('./src/config/database');

// Importar rutas principales
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./@routes/userRoutes');
const gimnasioRoutes = require('./@routes/gimnasioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas básicas
app.get('/', (req, res) => {
  res.json({
    message: '¡Bienvenido a tu API con Express.js!',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Ruta de ejemplo para usuarios
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Juan', email: 'juan@ejemplo.com' },
    { id: 2, name: 'María', email: 'maria@ejemplo.com' },
    { id: 3, name: 'Carlos', email: 'carlos@ejemplo.com' }
  ];
  res.json(users);
});

// Usar todas las rutas de la API con prefijo /api
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/gimnasios', gimnasioRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Función para inicializar la aplicación
async function startServer() {
  try {
    // Probar conexión a la base de datos
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('❌ No se pudo conectar a la base de datos. Verifica la configuración.');
      process.exit(1);
    }

    

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`📊 Health check disponible en http://localhost:${PORT}/api/health`);

    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
}

// Iniciar la aplicación
startServer();

module.exports = app;
