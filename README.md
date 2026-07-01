# API REST de Productos - Node.js + Express + Firebase

API REST para la gestión de productos desarrollada con Node.js, Express y Firebase Firestore. El proyecto expone operaciones CRUD, autenticación básica mediante JWT y almacenamiento persistente de productos en una base de datos NoSQL.

## ✨ Descripción general

Esta API permite:

- Crear, listar, consultar, actualizar y eliminar productos.
- Consultar productos por ID o por SKU.
- Generar automáticamente un SKU correlativo en formato PROD####.
- Proteger ciertos endpoints mediante autenticación JWT.
- Ejecutarse localmente y también desplegarse en servicios como Vercel.

## ✅ Características principales

- CRUD completo de productos.
- Almacenamiento en Firebase Firestore.
- Búsqueda por ID y por SKU.
- Generación automática de SKU.
- Validaciones básicas en el backend.
- Autenticación con JWT.
- Actualizaciones parciales de productos.
- Soporte para CORS.
- Estructura modular para facilitar el mantenimiento.

## 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- Firebase Firestore
- JSON Web Token (jsonwebtoken)
- dotenv
- CORS
- Jest + Supertest para pruebas

## 📁 Estructura del proyecto

```text
Api-Rest-Products-NodeJs-Express-FireBase/
├── app.js
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
├── .env-example
├── .gitignore
├── src/
│   ├── config/
│   │   └── firebase.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── home.controller.js
│   │   └── products.controller.js
│   ├── middlewares/
│   │   └── authentication.js
│   ├── models/
│   │   └── products.model.js
│   ├── routers/
│   │   ├── auth.router.js
│   │   └── products.router.js
│   ├── utils/
│   │   └── token-generator.js
│   └── views/
│       └── home.view.js
└── _tests_/
    ├── app.test.js
    ├── auth.test.js
    └── products.test.js
```

## 📋 Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js 18 o superior
- npm
- Una cuenta de Firebase con Firestore habilitado
- Las credenciales del proyecto Firebase

## ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone <URL_DEL_REPO>
cd Api-Rest-Products-NodeJs-Express-FireBase
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo .env a partir del ejemplo:

```bash
cp .env-example .env
```

4. Completa las variables de entorno en .env:

```env
PORT=3000
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu_proyecto_id
FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id
JWT_SECRET_KEY=tu_clave_secreta
```

## ▶️ Ejecución

Inicia el servidor en modo producción:

```bash
npm start
```

O en modo desarrollo:

```bash
npm run dev
```

La API quedará disponible en:

```text
http://localhost:3000
```

## 🔐 Autenticación

El proyecto incluye un endpoint de login que devuelve un token JWT. Para acceder a los endpoints protegidos, debes enviar el token en el encabezado Authorization:

```http
Authorization: Bearer <jwt_token>
```

### Credenciales de demostración

```json
{
  "email": "user@email.com",
  "password": "strongPass123"
}
```

## 📡 Endpoints disponibles

### 1. Página de bienvenida

```http
GET /
```

Respuesta: HTML de bienvenida del proyecto.

### 2. Login

```http
POST /api/auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "user@email.com",
  "password": "strongPass123"
}
```

Respuesta:

```json
{
  "token": "<jwt_token>"
}
```

### 3. Obtener todos los productos

```http
GET /api/products
```

Respuesta:

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

### 4. Obtener producto por ID

```http
GET /api/products/:id
```

Parámetros:

- id: ID del documento en Firestore.

### 5. Obtener producto por SKU

```http
GET /api/products/sku/:idSku
```

Parámetros:

- idSku: SKU del producto, por ejemplo PROD0001.

### 6. Crear producto

```http
POST /api/products/create
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

Body mínimo:

```json
{
  "name": "Mouse Logitech",
  "price": 45.99,
  "category": "Accesorios",
  "description": "Mouse inalámbrico de precisión",
  "stock": 20
}
```

Reglas aplicadas:

- name: obligatorio y debe ser texto no vacío.
- price: obligatorio, debe ser un número mayor a 0.
- category: obligatorio y debe ser texto no vacío.
- description: si no se envía, se guarda como cadena vacía.
- stock: si no se envía, se guarda como 0.
- sku: se genera automáticamente.

Respuesta esperada:

```json
{
  "message": "Producto guardado correctamente",
  "id": "doc-id",
  "name": "Mouse Logitech",
  "price": 45.99,
  "category": "Accesorios",
  "description": "Mouse inalámbrico de precisión",
  "stock": 20,
  "sku": "PROD0002"
}
```

### 7. Actualizar producto

```http
PUT /api/products/update/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

La actualización admite campos parciales. Solo se modifican los atributos enviados en el body.

Body ejemplo (parcial o completo):

```json
{
  "name": "Producto actualizado",
  "price": 99.99,
  "category": "Tecnología",
  "description": "Descripción nueva",
  "stock": 10
}
```

Notas importantes:

- Si no se envía ningún campo válido para actualizar, la API responde con estado 400.
- El campo sku no se puede modificar mediante esta ruta; si se envía, la API responde con 400.
- Si el producto no existe, la respuesta es 404.

### 8. Eliminar producto

```http
DELETE /api/products/:id
Authorization: Bearer <jwt_token>
```

Respuesta esperada:

```json
{
  "message": "Producto eliminado correctamente"
}
```

## 🧱 Modelo de datos

La colección principal se llama Products y cada documento contiene:

```json
{
  "id": "string",
  "name": "string",
  "price": "number",
  "category": "string",
  "description": "string",
  "stock": "number",
  "sku": "string"
}
```

### Reglas de negocio básicas

- name: obligatorio y no vacío.
- price: obligatorio, debe ser mayor a 0.
- category: obligatorio y no vacío.
- stock: si no se envía, se toma como 0.
- description: si no se envía, se toma como cadena vacía.
- sku: se genera automáticamente y no es editable desde la actualización.

### Estados HTTP esperados

- 200: operación exitosa.
- 201: producto creado correctamente.
- 400: datos inválidos o solicitud mal formada.
- 401: token faltante o inválido.
- 403: token inválido o expirado.
- 404: producto no encontrado.
- 500: error interno del servidor.

## 🧪 Pruebas

Para ejecutar las pruebas del proyecto:

```bash
npm test
```

El proyecto cuenta con pruebas básicas para la ruta principal, autenticación y CRUD de productos.

## 🚀 Despliegue

El proyecto incluye un archivo de configuración para Vercel.

### Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. Crea un nuevo proyecto en Vercel.
3. Conecta el repositorio.
4. Define las variables de entorno en Vercel con los mismos nombres que en .env.
5. Despliega.

### Variables de entorno necesarias en producción

- FIREBASE_API_KEY
- FIREBASE_AUTH_DOMAIN
- FIREBASE_PROJECT_ID
- FIREBASE_STORAGE_BUCKET
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_APP_ID
- JWT_SECRET_KEY

## 🔒 Notas importantes

- No subas el archivo .env a GitHub.
- El proyecto usa un usuario de prueba para autenticación local.
- Para producción, lo ideal es reemplazar la autenticación demo por un sistema de usuarios real y definir reglas de seguridad en Firestore.
- El archivo .gitignore ya excluye node_modules, archivos de VS Code y el archivo .env.

## 📌 Resumen

Este proyecto demuestra una arquitectura simple pero funcional para construir una API REST con Node.js, Express y Firebase, ideal para practicar CRUD, autenticación JWT, validaciones y despliegue básico.

````

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
````

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
