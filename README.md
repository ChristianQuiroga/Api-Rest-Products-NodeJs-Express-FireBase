# API REST de Productos - Node.js + Express + Firebase

API RESTful profesional para gestión de productos construida con **Node.js**, **Express** y **Firebase Firestore**. Proporciona operaciones CRUD completas, filtrado avanzado y validaciones robustas.

## 📋 Características

- ✅ Operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar)
- ✅ Búsqueda por ID y SKU
- ✅ Generación automática de SKU correlativo
- ✅ Validación y sanitización de datos
- ✅ Manejo robusto de errores con códigos HTTP
- ✅ Autenticación con JWT (jsonwebtoken)
- ✅ CORS habilitado para múltiples orígenes
- ✅ Base de datos en tiempo real con Firebase Firestore

## 🏗️ Arquitectura

La aplicación sigue una arquitectura en **capas** clara y escalable:

```
index.js (Punto de entrada)
    ↓
src/routers/products.router.js (Definición de rutas)
    ↓
src/controllers/products.controller.js (Lógica HTTP + validaciones + negocio)
    ↓
src/models/products.model.js (Acceso a datos - Firestore + SKU)
```

### Descripción de capas

| Capa           | Responsabilidad                                                     | Ubicación          |
| -------------- | ------------------------------------------------------------------- | ------------------ |
| **Router**     | Mapeo de rutas HTTP y delegación a controladores                    | `src/routers/`     |
| **Controller** | Manejo de requests/responses, validaciones, reglas de negocio       | `src/controllers/` |
| **Model**      | Operaciones CRUD en Firebase Firestore, formateo, generación de SKU | `src/models/`      |

## 📁 Estructura del Proyecto

```
Api-Rest-Products-NodeJs-Express-FireBase/
├── index.js                              # Punto de entrada de la aplicación
├── package.json                          # Dependencias del proyecto
├── .env                                  # Variables de entorno (no versionado)
├── .env.example                          # Ejemplo de variables de entorno
├── README.md                             # Este archivo
└── src/
    ├── controllers/
    │   └── products.controller.js        # Controladores de productos
    ├── models/
    │   ├── products.model.js             # Métodos de acceso a Firestore y SKU
    │   └── data/
    │       └── data.js                   # Configuración de Firebase
    └── routers/
        └── products.router.js            # Definición de rutas
```

## 🚀 Instalación

### Requisitos Previos

- **Node.js** v16+
- **npm** o **yarn**
- Cuenta de **Firebase** con proyecto activo
- **Credenciales de Firebase** (API Key, Project ID, etc.)

### Pasos

1. **Clonar o descargar el proyecto**

   ```bash
   git clone <URL_DEL_REPO>
   cd Api-Rest-Products-NodeJs-Express-FireBase
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto con tus credenciales de Firebase:

   ```env
   PORT=3000
   FIREBASE_API_KEY=tu_api_key_aqui
   FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
   FIREBASE_PROJECT_ID=tu_proyecto_id
   FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   FIREBASE_APP_ID=tu_app_id
   ```

4. **Ejecutar la aplicación**

   ```bash
   # Modo producción
   npm start

   # Modo desarrollo (con recarga automática)
   npm run dev
   ```

   El servidor estará disponible en: `http://localhost:3000`

## 📡 API Endpoints

### Obtener todos los productos

```http
GET /api/products
```

**Respuesta exitosa (200):**

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

---

### Obtener producto por ID

```http
GET /api/products/:id
```

**Parámetros:**

- `id` (string): ID del documento en Firestore

**Respuesta exitosa (200):**

```json
{
  "id": "doc-id",
  "name": "Laptop Dell",
  "price": 1200,
  "category": "Electrónica",
  "description": "Laptop de alto rendimiento",
  "stock": 5,
  "sku": "PROD0001"
}
```

**Errores:**

- `400`: ID no válido
- `404`: Producto no encontrado

---

### Obtener producto por SKU

```http
GET /api/products/sku/:idSku
```

**Parámetros:**

- `idSku` (string): SKU del producto (ej: PROD0001)

**Respuesta exitosa (200):** Mismo formato que obtener por ID

**Errores:**

- `400`: SKU no válido
- `404`: Producto no encontrado

---

### Crear nuevo producto

```http
POST /api/products/create
Content-Type: application/json
```

**Body requerido:**

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

- El SKU se genera automáticamente con formato `PROD####`
- Campos requeridos: `name`, `price`, `category`
- Campos opcionales: `description`, `stock`

**Respuesta exitosa (201):**

```json
{
  "message": "Producto guardado correctamente",
  "data": {
    "id": "doc-id-generado",
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

- `400`: Datos inválidos o campos requeridos faltantes
- `500`: Error al guardar en la base de datos

---

### Eliminar producto

```http
DELETE /api/products/:id
```

**Parámetros:**

- `id` (string): ID del documento en Firestore

**Respuesta exitosa (200):**

```json
{
  "message": "Producto eliminado correctamente"
}
```

**Errores:**

- `400`: ID no válido
- `404`: Producto no encontrado

---

## ✅ Validaciones

### Validación de Entrada (Controller)

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
