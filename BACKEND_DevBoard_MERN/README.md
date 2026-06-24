# UPTASKS BACKEND

API REST para gestión de proyectos y tareas. Backend desarrollado con Express.js y MongoDB.

## 📋 Descripción

UPTASKS es una aplicación backend que permite crear, gestionar y organizar proyectos con sus respectivas tareas. Proporciona endpoints RESTful completos para operaciones CRUD (Create, Read, Update, Delete) en proyectos y tareas.

## 🚀 Características

- ✅ Gestión completa de proyectos (crear, leer, actualizar, eliminar)
- ✅ Gestión de tareas asociadas a proyectos
- ✅ Validación robusta de datos con `express-validator`
- ✅ Validación de IDs MongoDB
- ✅ Actualización de estado de tareas
- ✅ Middleware de validación personalizado
- ✅ Manejo de errores centralizado

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **express-validator** - Validación de datos
- **TypeScript** - Tipado estático (opcional)

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd UPTASKS_BACKEND
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno (crea un archivo `.env`):
```env
PORT=4000
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<base-datos>
NODE_ENV=development
```

4. Inicia el servidor:
```bash
npm start
```

## 📚 Endpoints de la API

### Proyectos

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/projects` | Crear un nuevo proyecto |
| `GET` | `/api/projects` | Obtener todos los proyectos |
| `GET` | `/api/projects/:id` | Obtener un proyecto por ID |
| `PUT` | `/api/projects/:id` | Actualizar un proyecto |
| `DELETE` | `/api/projects/:id` | Eliminar un proyecto |

### Tareas

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/projects/:projectId/tasks` | Crear una tarea |
| `GET` | `/api/projects/:projectId/tasks` | Obtener todas las tareas de un proyecto |
| `GET` | `/api/projects/:projectId/tasks/:taskId` | Obtener una tarea específica |
| `PUT` | `/api/projects/:projectId/tasks/:taskId` | Actualizar una tarea |
| `DELETE` | `/api/projects/:projectId/tasks/:taskId` | Eliminar una tarea |
| `POST` | `/api/projects/:projectId/tasks/:taskId/status` | Actualizar estado de una tarea |

## 📝 Ejemplos de Uso

### Crear un Proyecto

```bash
POST /api/projects
Content-Type: application/json

{
  "projectName": "Mi Proyecto",
  "clientName": "Cliente XYZ",
  "description": "Descripción del proyecto"
}
```

### Crear una Tarea

```bash
POST /api/projects/:projectId/tasks
Content-Type: application/json

{
  "taskName": "Implementar login",
  "description": "Crear sistema de autenticación"
}
```

### Actualizar Estado de Tarea

```bash
POST /api/projects/:projectId/tasks/:taskId/status
Content-Type: application/json

{
  "status": "completed"
}
```

## 🔍 Validación

La API valida automáticamente:
- ✅ IDs MongoDB válidos
- ✅ Campos requeridos no vacíos
- ✅ Existencia de proyectos
- ✅ Pertenencia de tareas a proyectos

## 📂 Estructura del Proyecto

```
src/
├── controllers/
│   ├── ProjectController.ts
│   └── TaskController.ts
├── middleware/
│   ├── validationMiddleware.ts
│   ├── projectMiddleware.ts
│   └── taskMiddleware.ts
├── routes/
│   └── projectRoutes.ts
├── models/
│   ├── Project.ts
│   └── Task.ts
└── app.ts
```

## ⚙️ Configuración

### Variables de Entorno Recomendadas

```env
PORT=4000
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/uptasks
NODE_ENV=development
```

## 🧪 Testing

Para ejecutar las pruebas:

```bash
npm test
```

## 📖 Notas Técnicas

- Los parámetros `projectId` y `taskId` se validan automáticamente con `router.param()`
- Todos los IDs deben ser ObjectId válidos de MongoDB
- Los errores de validación se retornan con estado 400

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## ✉️ Contacto

Para preguntas o sugerencias, contacta al equipo de desarrollo.

---

**Última actualización:** 2026-06-23