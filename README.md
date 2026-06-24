# DevBoard - Gestor de Proyectos y Tareas

![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)

## 📋 Descripción

DevBoard es una aplicación web full-stack para la gestión de proyectos y tareas, pensada especialmente para developers. Permite crear, organizar y administrar proyectos con sus respectivas tareas de manera intuitiva y eficiente.

**Nota:** Este proyecto se encuentra en fase de desarrollo activo.

## 🛠️ Stack Tecnológico

### Frontend
- **React** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **TanStack Query (React Query)** - Manejo de estado del servidor y caché
- **Zod** - Validación de esquemas en tiempo de ejecución
- **React Router** - Enrutamiento
- **Tailwind CSS** - Estilos
- **Axios** - Cliente HTTP

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **TypeScript** - Tipado estático
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación y autorización *(en desarrollo)*

## ⚙️ Requisitos Previos

- Node.js (v18.0.0 o superior)
- npm o yarn
- MongoDB (local o MongoDB Atlas)
- Git

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/DevBoard.git
cd DevBoard
```

### 2. Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar Dependencias del Frontend

```bash
cd ../frontend
npm install
```

### 4. Configurar Variables de Entorno

**Backend** (`backend/.env`):
```
MONGODB_URI=tu_conexion_mongodb
JWT_SECRET=tu_clave_secreta_jwt
PORT=4000
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:4000/api
```

## 🚀 Ejecución

### Iniciar el Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

### Iniciar el Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
DevBoard/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Lógica de negocio
│   │   ├── models/             # Esquemas de Mongoose
│   │   ├── routes/             # Definición de rutas API
│   │   ├── middleware/         # Autenticación y validación
│   │   ├── config/             # Configuración (BD, etc)
│   │   └── server.ts           # Punto de entrada
│   ├── .env                    # Variables de entorno (no versionado)
│   ├── .gitignore
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   ├── pages/               # Vistas principales
│   │   ├── api/                 # Llamadas a API
│   │   ├── hooks/                # Custom hooks (TanStack Query)
│   │   ├── schemas/             # Esquemas de validación con Zod
│   │   ├── types/                # Tipos e interfaces de TypeScript
│   │   ├── App.tsx              # Componente raíz
│   │   └── main.tsx             # Punto de entrada
│   ├── public/                  # Archivos estáticos
│   ├── .env                     # Variables de entorno (no versionado)
│   ├── .gitignore
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🎯 Características del Proyecto

### ✅ Funcionalidades Implementadas
- Crear y gestionar proyectos
- Crear y editar tareas dentro de proyectos
- Asignar estado a tareas (pendiente, en progreso, completada)
- Validación de formularios con Zod
- Manejo de estado del servidor con TanStack Query
- Dashboard con vista general de proyectos

### 🔄 En Desarrollo
- Autenticación de usuarios con JWT
- Registro e inicio de sesión
- Búsqueda y filtrado avanzado de tareas

### 📝 Planeado Futuro
- Drag & drop para cambiar estados
- Colaboración entre usuarios
- Comentarios en tareas
- Notificaciones en tiempo real
- Exportar proyectos a PDF

## 🔐 Autenticación

El proyecto está integrando **JWT (JSON Web Tokens)** para la autenticación:

- Los usuarios se registrarán con email y contraseña
- Las contraseñas se almacenarán hasheadas en la base de datos
- Al iniciar sesión, se generará un token JWT que se almacenará en el cliente
- El token se incluirá en cada solicitud al backend para verificar autenticidad

## 📊 Modelos de Datos

### Usuario
```
{
  _id: ObjectId,
  nombre: String,
  email: String,
  password: String (hasheada),
  fechaRegistro: Date
}
```

### Proyecto
```
{
  _id: ObjectId,
  nombre: String,
  descripcion: String,
  propietario: ObjectId (referencia a Usuario),
  fechaCreacion: Date,
  fechaActualizacion: Date
}
```

### Tarea
```
{
  _id: ObjectId,
  nombre: String,
  descripcion: String,
  proyecto: ObjectId (referencia a Proyecto),
  estado: String (pendiente, en progreso, completada),
  prioridad: String (baja, media, alta),
  fechaVencimiento: Date,
  fechaCreacion: Date
}
```

## 🧪 Pruebas

```bash
# Frontend
cd frontend
npm run test

# Backend
cd backend
npm run test
```

## 🐛 Problemas Conocidos

- Actualmente en fase beta
- La autenticación con JWT aún está en desarrollo
- La sincronización en tiempo real está planeada para futuras versiones

## 📅 Historial de Cambios

- **v0.1.0** (Junio 2026) - Versión inicial en desarrollo
  - Setup del proyecto MERN con TypeScript
  - CRUD de proyectos y tareas
  - Integración de TanStack Query y Zod en el frontend

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Última Actualización:** 24 de Junio, 2026
**Estado:** En Desarrollo Activo 🚧