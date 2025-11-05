# 📂 M8\_AE2\_ABP - API REST de Gestión de Usuarios

Este proyecto implementa una API REST simple para la gestión de usuarios (CRUD) que utiliza **Node.js** con **Express**. La persistencia de datos se maneja a través de archivos JSON locales.

## 🚀 Instalación y Ejecución

Sigue estos pasos para poner en marcha el servidor de la API:

### 1\. Requisitos

  * **Node.js** (versión recomendada 18 o superior).

### 2\. Instalación de Dependencias

Una vez clonado el repositorio, navega al directorio del proyecto e instala las dependencias:

```bash
npm install
```

### 3\. Ejecución del Servidor

El proyecto ofrece dos scripts de ejecución definidos en `package.json`:

| Script | Comando | Descripción |
| :--- | :--- | :--- |
| **Producción** | `npm start` | Inicia el servidor de forma estándar. |
| **Desarrollo** | `npm run dev` | Inicia el servidor con `nodemon` para reinicio automático tras cambios en el código. |

El servidor se iniciará en el puerto **3000**:

```
Servidor corriendo en http://localhost:3000
```

-----

## 🗺️ Endpoints de la API

El proyecto expone dos rutas principales: `/saludos` y `/usuarios`.

### 1\. Gestión de Usuarios (`/usuarios`)

Esta es la ruta principal para realizar operaciones CRUD sobre la base de datos de usuarios (`usuarios.json`).

| Método | Ruta | Descripción | Código de Éxito |
| :--- | :--- | :--- | :--- |
| `GET` | `/usuarios` | Obtiene la lista de todos los usuarios. | `200 OK` |
| `GET` | `/usuarios/:id` | Obtiene un usuario específico por su ID. | `200 OK` |
| `POST` | `/usuarios` | Crea un nuevo usuario. Requiere `nombre` y `correo` en el body (JSON). | `201 Created` |
| `PUT` | `/usuarios/:id` | Actualiza un usuario existente por su ID. Requiere `nombre` y `correo` en el body (JSON). | `200 OK` |
| `DELETE` | `/usuarios/:id` | Elimina un usuario por su ID. | `200 OK` |

#### **Ejemplo de Petición (POST):**

```json
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "nombre": "Nuevo Usuario Ejemplo",
  "correo": "ejemplo@test.com"
}
```

### 2\. Ruta de Saludo (`/saludos`)

Esta ruta simple devuelve un saludo personalizado.

| Método | Ruta | Parámetros Query | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/saludos` | `nombre` (opcional) | Devuelve un saludo, usando "Invitado" si no se proporciona el parámetro `nombre`. |

#### **Ejemplo de Petición (GET):**

```
GET http://localhost:3000/saludos?nombre=Jose

// Respuesta
{
    "saludo": "Hola Jose gracias por usar esta APIRest",
    "parametrosNoUsados": {}
}
```

-----

## 🛠️ Manejo de Errores y Validación

El API utiliza un sistema robusto de manejo de errores personalizado:

  * **Validación de Datos (Middleware):** Las rutas `POST` y `PUT` usan el `validarUsuarioMdw` para asegurar que el `body` contiene un `nombre` y un `correo` válidos antes de procesar la solicitud.
      * **Errores de Validación** devuelven un código `400 Bad Request` o `460 No se ha ingresado información de usuario en el body de la solicitud`.
  * **Errores de Negocio:** La capa `UsuariosAdmin` verifica:
      * **Recurso No Encontrado (404):** Si el `id` no existe en la base de datos.
      * **Correo Duplicado (400):** Si se intenta añadir o editar un usuario con un correo ya existente.
  * **Middleware de Errores:** Todos los errores (personalizados y genéricos) son capturados por el `errorMiddleware` en `server.js`, que garantiza una respuesta JSON consistente con el código de estado HTTP adecuado.
      * Cualquier ruta no definida (`app.all("*")`) genera un `404 Not Found`.