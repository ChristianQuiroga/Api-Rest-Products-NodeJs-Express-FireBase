import * as productsModel from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productsModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error en getAllProducts:", error.message);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("ID no válido");
      error.status = 400;
      throw error;
    }

    const producto = await productsModel.getProductById(id);

    if (!producto) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      throw error;
    }

    res.json(producto);
  } catch (error) {
    console.error("Error en getProductById:", error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Error al obtener el producto" });
  }
};

export const getProductBySku = async (req, res) => {
  try {
    const { idSku } = req.params;

    if (!idSku) {
      const error = new Error("SKU no válido");
      error.status = 400;
      throw error;
    }

    const producto = await productsModel.getProductBySku(idSku);

    if (!producto) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      throw error;
    }

    res.json(producto);
  } catch (error) {
    console.error("Error en getProductBySku:", error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Error al obtener el producto" });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("ID no válido");
      error.status = 400;
      throw error;
    }

    const producto = await productsModel.getProductById(id);
    if (!producto) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      throw error;
    }

    await productsModel.deleteProducts(id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error en deleteProducts:", error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Error al eliminar el producto" });
  }
};

export const createProducts = async (req, res) => {
  try {
    const product = req.body;

    if (!product || typeof product !== "object") {
      const error = new Error("Producto no válido");
      error.status = 400;
      throw error;
    }

    const requiredFields = ["name", "price", "category"];
    const missingFields = requiredFields.filter((field) => !product[field]);

    if (missingFields.length > 0) {
      const error = new Error(
        `Campos requeridos faltantes: ${missingFields.join(", ")}`,
      );
      error.status = 400;
      throw error;
    }

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

    if (
      typeof product.category !== "string" ||
      product.category.trim() === ""
    ) {
      const error = new Error("La categoría debe ser un texto válido");
      error.status = 400;
      throw error;
    }

    const sanitizedProduct = {
      name: product.name.trim(),
      price: parseFloat(product.price),
      category: product.category.trim(),
      description: product.description ? product.description.trim() : "",
      stock: product.stock ? parseInt(product.stock) : 0,
    };

    const savedProduct = await productsModel.createProducts(sanitizedProduct);
    res.status(201).json({
      message: "Producto guardado correctamente",
      //data: savedProduct,
      ...savedProduct,
    });
  } catch (error) {
    console.error("Error en createProducts:", error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Error al guardar el producto" });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description, stock, sku } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "El ID del producto es obligatorio" });
    }

    if (sku) {
      return res
        .status(400)
        .json({
          message:
            "No se puede actualizar el SKU del producto, elimínelo del cuerpo de la solicitud",
        });
    }

    if (!name || !price || !category || !description || !stock) {
      return res.status(422).json({ message: "Faltan datos obligatorios" });
    }

    const updatedProducts = await productsModel.updateProducts(id, {
      name,
      price,
      category,
      description,
      stock,
    });

    if (!updatedProducts) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(updatedProducts);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno al actualizar el producto",
      error: error.message,
    });
  }
};
