import * as productModel from '../models/products.model.js';

export const getAllProducts = () => productModel.getAllProducts();


export const getProductById = async (id) => {
  if (!id) {
    const error = new Error("ID no válido");
    error.status = 400;
    throw error;
  }

  const producto = await productModel.getProductById(id);

  if (!producto) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    throw error;
  }

  return producto;
};

export const getProductBySku = async (idSku) => {
  if (!idSku) {
    const error = new Error("SKU no válido");
    error.status = 400;
    throw error;
  }

  const producto = await productModel.getProductBySku(idSku);

  if (!producto) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    throw error;
  }

  return producto;
};

export const filterProducts = async (categoria, minPrecio, maxPrecio) => {
  const productos = await productModel.getAllProducts();
  let resultados = productos.slice(); // Crear una copia del array para aplicar filtros

  if (categoria) {
    resultados = resultados.filter((p) => p.category === categoria);
  }

  if (minPrecio) {
    const min = Number(minPrecio);
    if (!Number.isNaN(min)) {
      resultados = resultados.filter((p) => p.price >= min);
    }
  }

  if (maxPrecio) {
    const max = Number(maxPrecio);
    if (!Number.isNaN(max)) {
      resultados = resultados.filter((p) => p.price <= max);
    }
  }

  return resultados;
};

// Método para eliminar un producto por su ID
export const deleteProducts = async (id) => {
  if (!id) {
    const error = new Error("ID no válido");
    error.status = 400;
    throw error;
  }

  const producto = await productModel.getProductById(id);
  if (!producto) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    throw error;
  }

  await productModel.deleteProducts(id);
  return producto;
};

// Método para guardar un producto
export const createProducts = async (product) => {
  // Validar que el producto sea un objeto válido
  if (!product || typeof product !== "object") {
    const error = new Error("Producto no válido");
    error.status = 400;
    throw error;
  }

  // Validar campos requeridos
  const requiredFields = ["name", "price", "category"];
  const missingFields = requiredFields.filter((field) => !product[field]);

  if (missingFields.length > 0) {
    const error = new Error(
      `Campos requeridos faltantes: ${missingFields.join(", ")}`,
    );
    error.status = 400;
    throw error;
  }

  // Validar tipos de datos
  if (typeof product.name !== "string" || product.name.trim() === "") {
    const error = new Error("El nombre debe ser un texto válido");
    error.status = 400;
    throw error;
  }

  if (typeof product.price !== "number" || product.price < 0) {
    const error = new Error("El precio debe ser un número mayor a 0");
    error.status = 400;
    throw error;
  }

  if (typeof product.category !== "string" || product.category.trim() === "") {
    const error = new Error("La categoría debe ser un texto válido");
    error.status = 400;
    throw error;
  }

  // Sanitizar datos
  const sanitizedProduct = {
    name: product.name.trim(),
    price: parseFloat(product.price),
    category: product.category.trim(),
    description: product.description ? product.description.trim() : "",
    stock: product.stock ? parseInt(product.stock) : 0,
  };

  // Guardar y devolver el producto
  return await productModel.createProducts(sanitizedProduct);
};
