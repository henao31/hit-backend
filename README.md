# Proyecto Express.js

Un proyecto básico con Express.js configurado y listo para usar.

## 🚀 Características

- **Express.js** - Framework web para Node.js
- **CORS** - Habilitación de Cross-Origin Resource Sharing
- **Morgan** - Logger de peticiones HTTP
- **Dotenv** - Manejo de variables de entorno
- **Nodemon** - Reinicio automático del servidor en desarrollo

## 📦 Instalación

1. Clona o descarga este proyecto
2. Instala las dependencias:

```bash
npm install
```

## 🛠️ Uso

### Desarrollo
Para ejecutar el servidor en modo desarrollo (con reinicio automático):

```bash
npm run dev
```

### Producción
Para ejecutar el servidor en modo producción:

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000` por defecto.

## 📡 Endpoints Disponibles

### GET `/`
- **Descripción**: Página de bienvenida
- **Respuesta**: Información básica de la API

### GET `/api/health`
- **Descripción**: Health check del servidor
- **Respuesta**: Estado del servidor y tiempo de actividad

### GET `/api/users`
- **Descripción**: Obtener lista de usuarios
- **Respuesta**: Array de usuarios de ejemplo

### POST `/api/users`
- **Descripción**: Crear un nuevo usuario
- **Body**: 
  ```json
  {
    "name": "Nombre del usuario",
    "email": "email@ejemplo.com"
  }
  ```
- **Respuesta**: Usuario creado con ID y timestamp

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
NODE_ENV=development
```

### Puerto

El servidor usa el puerto definido en la variable de entorno `PORT` o 3000 por defecto.

## 📁 Estructura del Proyecto

```
daya/
├── index.js          # Archivo principal del servidor
├── package.json      # Configuración del proyecto y dependencias
├── .gitignore       # Archivos ignorados por Git
└── README.md        # Este archivo
```

## 🛡️ Middleware Incluido

- **CORS**: Permite peticiones desde diferentes orígenes
- **Morgan**: Registra todas las peticiones HTTP
- **express.json()**: Parsea el cuerpo de las peticiones JSON
- **express.urlencoded()**: Parsea datos de formularios
- **Manejo de errores**: Middleware personalizado para errores
- **404 Handler**: Maneja rutas no encontradas

## 🚦 Próximos Pasos

1. **Base de datos**: Integra una base de datos (MongoDB, PostgreSQL, etc.)
2. **Autenticación**: Implementa JWT o sesiones
3. **Validación**: Agrega validación de datos con Joi o similar
4. **Testing**: Configura Jest o Mocha para pruebas
5. **Documentación**: Usa Swagger para documentar la API
6. **Seguridad**: Implementa rate limiting, helmet, etc.

## 📝 Scripts Disponibles

- `npm start` - Ejecuta el servidor en modo producción
- `npm run dev` - Ejecuta el servidor en modo desarrollo con nodemon
- `npm test` - Ejecuta las pruebas (pendiente de configurar)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
