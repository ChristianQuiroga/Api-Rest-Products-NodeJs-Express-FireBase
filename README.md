# API REST de Productos - Node.js + Express + Firebase

API REST profesional para gestión de productos construida con **Node.js**, **Express** y **Firebase Firestore**. Proporciona operaciones CRUD, autenticación JWT y almacenamiento en Firestore.

## 📋 Características

- CRUD de productos con Firestore
- Obtención por ID y por SKU
- Generación automática de SKU correlativo
- Validaciones de entrada en backend
- Autenticación con JWT
- Rutas públicas y protegidas
- CORS habilitado
- Estructura modular y escalable

## 🏗️ Arquitectura del proyecto

La aplicación está organizada en capas para separar responsabilidades:

- `index.js` — servidor, middleware y rutas principales
- `src/routers/` — definición de rutas HTTP
- `src/controllers/` — lógica de controladores
- `src/models/` — acceso a datos con Firebase Firestore
- `src/config/` — configuración de Firebase
- `src/middlewares/` — validación de token JWT
- `src/utils/` — utilidades como el generador de tokens
- `src/views/` — vista HTML de la ruta principal

## 📁 Estructura del proyecto

```
Api-Rest-Products-NodeJs-Express-FireBase/
├── .env
├── .env-example
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
└── src/
    ├── config/
    │   └── firebase.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── home.controller.js
    │   └── products.controller.js
    ├── middlewares/
    │   └── authentication.js
    ├── models/
    │   └── products.model.js
    ├── routers/
    │   ├── auth.router.js
    │   └── products.router.js
    ├── utils/
    │   └── token-generator.js
    └── views/
        └── home.view.js
```

## 🚀 Instalación

### Requisitos previos

- Node.js v16 o superior
- npm o yarn
- Cuenta de Firebase con Firestore habilitado
- Credenciales de Firebase

### Pasos

```bash
git clone <URL_DEL_REPO>
cd Api-Rest-Products-NodeJs-Express-FireBase
npm install
```

### Configurar variables de entorno

Copia `.env-example` a `.env` y completa los valores:

```env
PORT=3000
FIREBASE_API_KEY=tu_api_key_aqui
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu_proyecto_id
FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id
JWT_SECRET_KEY=tu_clave_secreta
```

### Ejecutar la aplicación

```bash
npm start
```

Modo desarrollo:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

## 📡 Endpoints disponibles

### 1. Página de bienvenida

```http
GET /
```

- Devuelve HTML con información del proyecto.
- Público.

---

### 2. Login

```http
POST /api/auth/login
Content-Type: application/json
```

**Body:**

```json
{
  "email": "user@email.com",
  "password": "strongPass123"
}
```

**Respuesta:**

```json
{
  "token": "<jwt_token>"
}
```

- Usuario estático definido en `src/controllers/auth.controller.js`.
- Token válido por 1 hora.

---

### 3. Obtener todos los productos

```http
GET /api/products
```

**Respuesta (200):**

```json
[
  {
    "id": "doc-id",
    "name": "Laptop Dell",
    "price": 1200,
    "category": "Electrónica",
    "description": "Laptop de alto rendimiento",
    "stock": 5,
    "sku": "PROD0001"
  }
]
```

- Ruta pública.

---

### 4. Obtener producto por ID

```http
GET /api/products/:id
```

**Parámetros:**

- `id` (string) — ID del documento en Firestore.

**Respuestas:**

- `200` → producto encontrado.
- `400` → ID no válido.
- `404` → producto no encontrado.

---

### 5. Obtener producto por SKU

```http
GET /api/products/sku/:idSku
```

**Parámetros:**

- `idSku` (string) — SKU del producto, ejemplo `PROD0001`.

**Respuestas:**

- `200` → producto encontrado.
- `400` → SKU no válido.
- `404` → producto no encontrado.

**Requiere token JWT**.

---

### 6. Crear producto

```http
POST /api/products/create
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

**Body mínimo:**

```json
{
  "name": "Mouse Logitech",
  "price": 45.99,
  "category": "Accesorios",
  "description": "Mouse inalámbrico de precisión",
  "stock": 20
}
```

**Notas:**

- Campos requeridos: `name`, `price`, `category`.
- Campos opcionales: `description`, `stock`.
- El SKU se genera automáticamente en formato `PROD0001`, `PROD0002`, etc.

**Respuesta (201):**

```json
{
  "message": "Producto guardado correctamente",
  "data": {
    "id": "doc-id",
    "name": "Mouse Logitech",
    "price": 45.99,
    "category": "Accesorios",
    "description": "Mouse inalámbrico de precisión",
    "stock": 20,
    "sku": "PROD0002"
  }
}
```

**Errores:**

- `400` → datos inválidos o campos faltantes.
- `500` → error interno del servidor.

---

### 7. Eliminar producto

```http
DELETE /api/products/:id
Authorization: Bearer <jwt_token>
```

**Parámetros:**

- `id` (string) — ID del documento en Firestore.

**Respuesta (200):**

```json
{
  "message": "Producto eliminado correctamente"
}
```

**Errores:**

- `400` → ID no válido.
- `404` → producto no encontrado.

## 🔒 Endpoints protegidos

Los siguientes endpoints requieren encabezado:

```http
Authorization: Bearer <jwt_token>
```

- `GET /api/products/sku/:idSku`
- `POST /api/products/create`
- `DELETE /api/products/:id`

## 📦 Dependencias

Dependencias definidas en `package.json`:

- `express` — framework HTTP.
- `cors` — habilita CORS.
- `dotenv` — carga variables de entorno.
- `firebase` — cliente Firebase para Firestore.
- `jsonwebtoken` — generación y validación de JWT.
- `body-parser` — parseo JSON (aunque `express.json()` es la opción activa en el código).

## 🧩 Archivos clave agregados

- `index.js` — punto de entrada del servidor.
- `src/config/firebase.js` — configuración de Firebase Firestore.
- `src/routers/auth.router.js` — rutas de autenticación.
- `src/routers/products.router.js` — rutas de productos.
- `src/controllers/auth.controller.js` — lógica de login.
- `src/controllers/products.controller.js` — validaciones y controladores de producto.
- `src/controllers/home.controller.js` — ruta `/` de bienvenida.
- `src/models/products.model.js` — acceso y operaciones en Firestore.
- `src/middlewares/authentication.js` — middleware JWT.
- `src/utils/token-generator.js` — generación de token JWT.
- `src/views/home.view.js` — vista HTML de la ruta principal.
- `.env-example` — plantilla de variables de entorno.
- `vercel.json` — configuración de despliegue.

## 💡 Notas importantes

- La aplicación usa `type: module` en `package.json`.
- El token JWT se verifica en `src/middlewares/authentication.js`.
- No existe endpoint de actualización (`PUT`/`PATCH`) en la versión actual.

## 📌 Ejemplo rápido

1. Obtener token:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@email.com","password":"strongPass123"}'
```

2. Crear producto:

```bash
curl -X POST http://localhost:3000/api/products/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{"name":"Teclado","price":59.99,"category":"Accesorios","description":"Teclado mecánico","stock":15}'
```

---

Si necesitas, puedo también agregar ejemplos de request con Postman o Insomnia.

- **name**: Debe ser un texto no vacío
- **price**: Debe ser un número mayor a 0
- **category**: Debe ser un texto no vacío
- **stock**: Número entero (default: 0)
- **description**: Texto (default: vacío)

### Sanitización

- Todos los textos se trimean (espacios al inicio/final se eliminan)
- `price` se convierte a número decimal
- `stock` se convierte a número entero

## 🔐 Consideraciones de Seguridad

- Implementar autenticación JWT antes de producción
- Validar permisos de usuario en cada endpoint
- Usar Firebase Security Rules para controlar acceso a datos
- No versionear `.env` (incluido en `.gitignore`)
- Implementar rate limiting en producción
- Usar HTTPS en producción

## 🛠️ Tecnologías Utilizadas

| Tecnología       | Versión  | Propósito               |
| ---------------- | -------- | ----------------------- |
| **Node.js**      | v16+     | Runtime de JavaScript   |
| **Express**      | ^5.2.1   | Framework web           |
| **Firebase**     | ^12.14.0 | Base de datos Firestore |
| **body-parser**  | ^2.2.2   | Parser de JSON          |
| **cors**         | ^2.8.6   | Manejo de CORS          |
| **dotenv**       | ^17.4.2  | Variables de entorno    |
| **jsonwebtoken** | ^9.0.3   | Autenticación JWT       |

## 📊 Modelo de Datos

### Colección: `Products`

```javascript
{
  id: string,           // Generado automáticamente por Firestore
  name: string,         // Nombre del producto (requerido)
  price: number,        // Precio (requerido, > 0)
  category: string,     // Categoría (requerido)
  description: string,  // Descripción (opcional, default: "")
  stock: number,        // Cantidad en inventario (opcional, default: 0)
  sku: string          // SKU único PROD#### (auto-generado)
}
```

## 🔄 Generación de SKU Correlativo

El sistema genera automáticamente un SKU único y correlativo para cada nuevo producto.

### Algoritmo de generación

```javascript
export async function getNextSku() {
  // 1. Obtener todos los documentos de la colección
  const querySnapshot = await getDocs(productsCollection);
  let maxSkuNumber = 0;

  // 2. Iterar documentos y extraer número del SKU existente
  querySnapshot.forEach((doc) => {
    const sku = doc.data()?.sku || "";
    // Buscar patrón: PROD#### (4 dígitos)
    const match = /^PROD(\\d+)$/.exec(sku);
    if (match) {
      // Actualizar máximo encontrado
      maxSkuNumber = Math.max(maxSkuNumber, Number(match[1]));
    }
  });

  // 3. Generar nuevo SKU con siguiente número
  return `PROD${String(maxSkuNumber + 1).padStart(4, "0")}`;
}
```

### Características

- **Formato:** `PROD####` (4 dígitos con padding)
- **Único:** Cada producto recibe un SKU diferente
- **Secuencial:** Incrementa correlativo desde el último registrado
- **Automático:** Se genera al crear producto, no requiere entrada del usuario

### Ejemplos de secuencia

| Secuencia        | SKU Generado | Descripción             |
| ---------------- | ------------ | ----------------------- |
| 1er producto     | `PROD0001`   | Primer SKU              |
| 2do producto     | `PROD0002`   | Incrementa              |
| 10mo producto    | `PROD0010`   | Mantiene 4 dígitos      |
| 100mo producto   | `PROD0100`   | Padding automático      |
| 1000mo producto  | `PROD1000`   | Crece sin límite        |
| 10000mo producto | `PROD10000`  | Expande según necesidad |

### Uso en el controlador

Al crear un producto, el SKU se genera automáticamente dentro del modelo:

```javascript
// En products.controller.js - createProducts()
const product = req.body;
const sanitizedProduct = validateAndSanitizeProduct(product);
// El SKU se genera aquí automáticamente
const savedProduct = await productsModel.createProducts(sanitizedProduct);
```

El usuario **NO** proporciona el SKU en la petición. Se genera y asigna automáticamente.

## 📝 Ejemplos de Uso

### Con cURL

**Obtener todos los productos:**

```bash
curl -X GET http://localhost:3000/api/products
```

**Crear un producto:**

```bash
curl -X POST http://localhost:3000/api/products/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teclado Mecánico",
    "price": 129.99,
    "category": "Accesorios",
    "stock": 10
  }'
```

**Eliminar un producto:**

```bash
curl -X DELETE http://localhost:3000/api/products/123abc
```

### Con JavaScript/Fetch

```javascript
// Obtener productos
const productos = await fetch("http://localhost:3000/api/products").then(
  (res) => res.json(),
);

// Crear producto
const nuevoProducto = await fetch("http://localhost:3000/api/products/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Monitor 4K",
    price: 599.99,
    category: "Electrónica",
    stock: 3,
  }),
}).then((res) => res.json());
```

## 🔧 Desarrollo

### Modo Development

```bash
npm run dev
```

El servidor se reinicia automáticamente al cambiar archivos (usando `--watch`).

### Scripts Disponibles

| Script        | Descripción                      |
| ------------- | -------------------------------- |
| `npm start`   | Inicia el servidor en producción |
| `npm run dev` | Inicia con recarga automática    |

## 🐛 Troubleshooting

### Error: "FIREBASE_PROJECT_ID no está definido"

- **Solución:** Verifica que el archivo `.env` existe y contiene todas las variables requeridas

### Error: "Puerto 3000 ya está en uso"

- **Solución:** Cambia el puerto en `.env`: `PORT=3001`

### Error: "Permiso denegado en Firestore"

- **Solución:** Revisa Firebase Security Rules y asegúrate de que la API key tiene permisos

## 📈 Próximas Mejoras

- [ ] Endpoint para actualizar (UPDATE) productos
- [ ] Optimizar generación de SKU con documento contador en Firestore (escalabilidad)
- [ ] Agregar índices en Firestore para consultas más rápidas
- [ ] Middleware global de manejo de errores
- [ ] Tests unitarios e integración
- [ ] Documentación interactiva con Swagger
- [ ] Paginación en listado de productos
- [ ] Sistema de autenticación JWT completo
- [ ] Logs estructurados y monitoreo

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Christian Quiroga Enriquez**

---

## 📞 Soporte

Para reportar problemas o sugerencias, crear un issue en el repositorio o contactar al desarrollador.

---

**Última actualización:** 2026-06-15  
**Versión:** 1.0.0
