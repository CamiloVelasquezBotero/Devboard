# DevBoard

![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)

## 📋 Descripción

DevBoard es una aplicación web full-stack para la gestión de proyectos y tareas, pensada especialmente para developers. Permite crear, organizar y administrar proyectos con sus respectivas tareas de manera intuitiva y eficiente.

> **Nota:** Este proyecto se encuentra en fase de desarrollo activo.

## 🛠️ Stack Tecnológico

**Frontend**
- React — Biblioteca de UI
- TypeScript — Tipado estático
- Vite — Build tool y dev server
- TanStack Query (React Query) — Manejo de estado del servidor y caché
- React Hook Form — Manejo de formularios
- Zod — Validación de esquemas en tiempo de ejecución
- React Router DOM — Enrutamiento
- Tailwind CSS — Estilos
- Axios — Cliente HTTP
- react-toastify — Notificaciones

**Backend**
- Node.js — Runtime de JavaScript
- Express — Framework web
- TypeScript — Tipado estático
- MongoDB — Base de datos NoSQL
- Mongoose — ODM para MongoDB
- JWT — Autenticación y autorización (en desarrollo)

## ⚙️ Requisitos Previos

- Node.js (v18.0.0 o superior)
- npm o yarn
- MongoDB (local o MongoDB Atlas)
- Git

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/CamiloVelasquezBotero/DevBoard.git
cd DevBoard
```

### 2. Instalar Dependencias del Backend

```bash
cd server
npm install
```

### 3. Instalar Dependencias del Frontend

```bash
cd ../client
npm install
```

### 4. Configurar Variables de Entorno

**Backend** (`server/.env`):

```env
MONGODB_URI=tu_conexion_mongodb
JWT_SECRET=tu_clave_secreta_jwt
PORT=4000
NODE_ENV=development
```

**Frontend** (`client/.env`):

```env
VITE_API_URL=http://localhost:4000/api
```

## 🚀 Ejecución

### Iniciar el Backend

```bash
cd server
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

### Iniciar el Frontend

```bash
cd client
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
DevBoard/
├── server/
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
├── client/
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   ├── pages/               # Vistas principales
│   │   ├── api/                 # Llamadas a API (Axios)
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

- Crear y gestionar proyectos (incluyendo nombre de cliente)
- Crear y editar tareas dentro de proyectos
- Flujo de estado de tareas con 5 etapas: pendiente, en espera, en progreso, en revisión, completada
- Validación de formularios con Zod y React Hook Form
- Manejo de estado del servidor con TanStack Query
- Dashboard con vista general de proyectos

### 🔄 En Desarrollo

- Autenticación de usuarios con JWT
- Registro e inicio de sesión
- Búsqueda y filtrado avanzado de tareas

### 📝 Planeado a Futuro

- Drag & drop para cambiar estados
- Prioridad y fecha de vencimiento en tareas
- Colaboración entre usuarios
- Comentarios en tareas
- Notificaciones en tiempo real
- Exportar proyectos a PDF

## 🔐 Autenticación

El proyecto está integrando JWT (JSON Web Tokens) para la autenticación:

- Los usuarios se registrarán con email y contraseña
- Las contraseñas se almacenarán hasheadas en la base de datos
- Al iniciar sesión, se generará un token JWT que se almacenará en el cliente
- El token se incluirá en cada solicitud al backend para verificar autenticidad

## 📊 Modelos de Datos

**Project**

```ts
{
  _id: ObjectId,
  projectName: string,
  clientName: string,
  description: string,
  tasks: ObjectId[], // referencias pobladas a Task
  createdAt: Date,
  updatedAt: Date
}
```

**Task**

```ts
{
  _id: ObjectId,
  taskName: string,
  description: string,
  project: ObjectId, // referencia a Project
  status: "pending" | "onHold" | "inProgress" | "underReview" | "completed",
  createdAt: Date,
  updatedAt: Date
}
```

> Cada `Project` puede tener múltiples `Task` asociadas (relación bidireccional: la tarea referencia a su proyecto, y el proyecto mantiene un array de referencias a sus tareas).

## 🧪 Pruebas

```bash
# Frontend
cd client
npm run test

# Backend
cd server
npm run test
```

## 🐛 Problemas Conocidos

- Actualmente en fase beta
- La autenticación con JWT aún está en desarrollo
- La sincronización en tiempo real está planeada para futuras versiones

## 📅 Historial de Cambios

**v0.1.0** (Junio 2026) — Versión inicial en desarrollo
- Setup del proyecto MERN con TypeScript
- CRUD de proyectos y tareas
- Integración de TanStack Query, React Hook Form y Zod en el frontend

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Última Actualización:** 27 de Junio, 2026
**Estado:** En Desarrollo Activo 🚧
