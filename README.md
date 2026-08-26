<p align="center">
  <img src="./logo-adavam.png" alt="Delivery Backend Logo" width="180"/>
</p>

# 🛵 Delivery Backend — Node.js REST API

<p align="center">
  API REST para sistema de delivery con gestión de usuarios, pedidos, productos, categorías y direcciones.<br/>
  Construida con <strong>Node.js</strong>, <strong>Express</strong>, <strong>MySQL</strong> y autenticación <strong>JWT</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v24.x-339933?style=flat-square&logo=node.js"/>
  <img src="https://img.shields.io/badge/Express-v5.2.1-000000?style=flat-square&logo=express"/>
  <img src="https://img.shields.io/badge/MySQL-v8.x-4479A1?style=flat-square&logo=mysql"/>
  <img src="https://img.shields.io/badge/pnpm-v11.x-F69220?style=flat-square&logo=pnpm"/>
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square"/>
</p>

---

## 📦 Versiones del Proyecto

| Dependencia              | Versión    | Descripción                         |
|--------------------------|------------|-------------------------------------|
| **Node.js**              | `^24.x`    | Entorno de ejecución JavaScript     |
| **pnpm**                 | `^11.24`   | Gestor de paquetes (recomendado)    |
| **express**              | `^5.2.1`   | Framework HTTP                      |
| **mysql2**               | `^3.24.2`  | Driver MySQL para Node.js           |
| **jsonwebtoken**         | `^9.0.3`   | Autenticación con tokens JWT        |
| **passport**             | `^0.7.0`   | Middleware de autenticación         |
| **passport-jwt**         | `^4.0.1`   | Estrategia JWT para Passport        |
| **bcryptjs**             | `^3.0.3`   | Encriptación de contraseñas         |
| **multer**               | `^2.2.0`   | Manejo de subida de archivos        |
| **@google-cloud/storage**| `^8.0.1`   | Almacenamiento en Firebase/GCS      |
| **nodemailer**           | `^9.0.5`   | Envío de correos electrónicos       |
| **socket.io**            | `^4.8.3`   | Comunicación en tiempo real         |
| **cors**                 | `^2.8.6`   | Políticas de origen cruzado         |
| **morgan**               | `^1.11.0`  | Logger de peticiones HTTP           |
| **dotenv**               | `^17.x`    | Variables de entorno desde `.env`   |
| **mercadopago**          | `^3.4.0`   | SDK de pagos MercadoPago            |
| **nodemon** *(dev)*      | `^3.1.14`  | Recarga automática en desarrollo    |

---

## ✅ Requisitos Previos

### 1. Node.js (v18 o superior)
```bash
node --version
```
> Descarga: https://nodejs.org

### 2. pnpm
```bash
npm install -g pnpm
pnpm --version
```

### 3. MySQL v8.x
```bash
mysql --version
```
> Descarga: https://dev.mysql.com/downloads/

### 4. Git
```bash
git --version
```

---

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/delivery-backend-with-nodejs.git
cd delivery-backend-with-nodejs

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Editar .env con tus datos locales

# 5. Crear la base de datos en MySQL
mysql -u root -p -e "CREATE DATABASE \`edaniel-delivery\`;"

# 6. Ejecutar el script SQL
mysql -u root -p \`edaniel-delivery\` < db/db.sql

# 7. Iniciar en desarrollo
pnpm dev
```

---

## ⚙️ Configuración — Variables de Entorno

Copia `.env.example` a `.env` y configura cada valor:

```env
# ─── SERVIDOR ──────────────────────────────────
PORT=3000
NODE_ENV=development

# ─── BASE DE DATOS MySQL ────────────────────────
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=edaniel-delivery

# ─── JWT ────────────────────────────────────────
JWT_SECRET=tu_clave_secreta_muy_larga_y_segura

# ─── GOOGLE CLOUD / FIREBASE STORAGE ───────────
GCS_PROJECT_ID=tu-project-id
GCS_BUCKET=gs://tu-bucket.appspot.com/
GCS_KEYFILE=./serviceAccountKey.json

# ─── NODEMAILER (Gmail) ─────────────────────────
MAIL_SERVICE=gmail
MAIL_USER=tucorreo@gmail.com
MAIL_PASS=tu_app_password_de_gmail

# ─── MERCADO PAGO ───────────────────────────────
MP_ACCESS_TOKEN=TEST-tu_access_token

# ─── APP ────────────────────────────────────────
PRODUCTION=false
ID_DEVELOPER=0
```

> **Gmail:** Genera una Contraseña de Aplicación en: Cuenta Google → Seguridad → Verificación en dos pasos → Contraseñas de aplicación.

> **Firebase/GCS:** Descarga `serviceAccountKey.json` desde: Consola Firebase → Configuración del proyecto → Cuentas de servicio.

---

## 📁 Estructura del Proyecto

```
delivery-backend-with-nodejs/
│
├── server.js                 # Punto de entrada del servidor
├── package.json              # Dependencias y scripts
├── .env                      # Variables de entorno (NO subir a Git)
├── .env.example              # Plantilla de configuración
├── .gitignore
├── logo.png                  # Logo del proyecto
│
├── config/
│   ├── config.js             # Conexión a la base de datos MySQL
│   ├── keys.js               # Clave secreta JWT
│   ├── passport.js           # Estrategia de autenticación JWT
│   └── env.js                # Configuración producción/desarrollo
│
├── routes/
│   ├── userRoutes.js
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   ├── addressRoutes.js
│   ├── orderRoutes.js
│   └── mercadoPagoRoutes.js  # (deshabilitado)
│
├── controllers/
│   ├── usersController.js    # Login, registro, email bienvenida
│   ├── categoriesController.js
│   ├── productsController.js
│   ├── addressController.js
│   └── ordersController.js   # Ciclo de vida de pedidos
│
├── models/
│   ├── user.js
│   ├── rol.js
│   ├── category.js
│   ├── product.js
│   ├── address.js
│   ├── order.js
│   └── order_has_products.js
│
├── utils/
│   ├── cloud_storage.js      # Subida de imágenes a GCS
│   └── async_foreach.js
│
├── sockets/
│   └── ordersSocket.js       # Pedidos en tiempo real (Socket.io)
│
└── db/
    └── db.sql                # Script de creación de tablas
```

---

## 🗄️ Base de Datos

> El nombre `edaniel-delivery` contiene un guión, por eso siempre usa backticks `` ` `` en MySQL.

### Tablas

| Tabla                | Descripción                              |
|----------------------|------------------------------------------|
| `users`              | Clientes, repartidores y administradores |
| `roles`              | Tipos de rol del sistema                 |
| `user_has_roles`     | Relación N:M entre usuarios y roles      |
| `categories`         | Categorías de productos                  |
| `products`           | Productos con hasta 3 imágenes           |
| `address`            | Direcciones de entrega por usuario       |
| `orders`             | Pedidos con estado y coordenadas GPS     |
| `order_has_products` | Productos incluidos en cada pedido       |

### Ciclo de vida de un pedido

```
PENDIENTE ──► PAGADO ──► EN_CAMINO ──► DESPACHADO ──► ENTREGADO
```

### Roles disponibles

| Rol           | Ruta de acceso              |
|---------------|-----------------------------|
| `RESTAURANTE` | `/restaurant/orders/list`   |
| `REPARTIDOR`  | `/delivery/orders/list`     |
| `CLIENTE`     | `/client/products/list`     |

---

## 🔌 Endpoints de la API

> Base URL: `http://localhost:3000`  
> 🔒 = Requiere header `Authorization: JWT <token>`

### 👤 Usuarios `/api/users`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/api/users/login` | ❌ | Login → retorna JWT |
| POST | `/api/users/create` | ❌ | Registro de usuario |
| POST | `/api/users/createWithImage` | ❌ | Registro con foto + envío de correo |
| GET  | `/api/users/findDelivery` | 🔒 | Listar repartidores |
| PUT  | `/api/users/update` | 🔒 | Actualizar perfil con imagen |
| PUT  | `/api/users/updateWithoutImage` | 🔒 | Actualizar perfil sin imagen |
| PUT  | `/api/users/updateNotificationToken` | 🔒 | Token de notificación push |

### 🗂️ Categorías `/api/categories`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET    | `/api/categories/getAll` | ❌ | Listar todas |
| POST   | `/api/categories/create` | 🔒 | Crear con imagen |
| PUT    | `/api/categories/updateWithImage` | 🔒 | Actualizar con imagen |
| PUT    | `/api/categories/update` | 🔒 | Actualizar sin imagen |
| DELETE | `/api/categories/delete/:id` | 🔒 | Eliminar |

### 🛍️ Productos `/api/products`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET    | `/api/products/findByCategory/:id_category` | 🔒 | Por categoría |
| POST   | `/api/products/create` | 🔒 | Crear (hasta 3 imágenes) |
| PUT    | `/api/products/updateWithImage` | 🔒 | Actualizar con imágenes |
| PUT    | `/api/products/update` | 🔒 | Actualizar sin imágenes |
| DELETE | `/api/products/delete/:id` | 🔒 | Eliminar |

### 📍 Direcciones `/api/address`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET  | `/api/address/findByUser/:id_user` | 🔒 | Por usuario |
| POST | `/api/address/create` | 🔒 | Crear dirección |

### 📦 Pedidos `/api/orders`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/orders/findByStatus/:status` | 🔒 | Por estado |
| GET | `/api/orders/findByDeliveryAndStatus/:id/:status` | 🔒 | Del repartidor |
| GET | `/api/orders/findByClientAndStatus/:id/:status` | 🔒 | Del cliente |
| POST | `/api/orders/create` | 🔒 | Crear pedido |
| PUT | `/api/orders/updateToPay` | 🔒 | → PAGADO |
| PUT | `/api/orders/updateToOnTheWay` | 🔒 | → EN CAMINO |
| PUT | `/api/orders/updateToDispatched` | 🔒 | → DESPACHADO |
| PUT | `/api/orders/updateToDelivered` | 🔒 | → ENTREGADO |

---

## 🔐 Autenticación JWT

```
1. POST /api/users/login  →  { email, password }
2. Servidor responde     →  { session_token: "JWT eyJ..." }
3. Guarda el token en el cliente
4. Envía en cada request protegido:
   Header: Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🛠️ Scripts

```bash
pnpm dev      # Servidor con nodemon (recarga automática) — Desarrollo
pnpm start    # Servidor con node — Producción
pnpm build    # Verifica la sintaxis del proyecto
```

---

## 🏗️ Flujo del Sistema

```
Cliente (App / Web)
       │
       ▼ HTTP Request (JSON)
  server.js  →  carga .env  →  configura Express + middlewares
       │
       ▼
  routes/*.js  →  define URLs  →  aplica JWT con Passport
       │
       ▼
  controllers/*.js  →  lógica de negocio
       │  ├── imágenes  →  Google Cloud Storage (utils/cloud_storage.js)
       │  └── correos   →  Gmail via Nodemailer
       ▼
  models/*.js  →  consultas SQL a MySQL
       │
       ▼
  MySQL (edaniel-delivery)
       │
       ▼
  JSON Response al cliente
```

---

## 🌐 Producción

```env
NODE_ENV=production
PRODUCTION=true
PORT=8080
```

```bash
pnpm start
```

---

## 👤 Autor

**Edaniel Valencia**

---

## 📄 Licencia

MIT
