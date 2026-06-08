import * as productsService from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await productsService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("Error en getAllProducts:", error.message);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};


export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productsService.getProductById(id);
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
    const producto = await productsService.getProductBySku(idSku);
    res.json(producto);
  } catch (error) {
    console.error("Error en getProductBySku:", error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Error al obtener el producto" });
  }
};

export const filterProducts = async (req, res) => {
  try {
    const { categoria, minPrecio, maxPrecio } = req.query;
    const resultados = await productsService.filterProducts(
      categoria,
      minPrecio,
      maxPrecio,
    );

    if (resultados.length === 0) {
      return res.status(404).json({
        message: "No se encontraron productos que coincidan con los criterios",
      });
    }

    res.json(resultados);
  } catch (error) {
    console.error("Error en filterProducts:", error.message);
    res.status(500).json({ message: "Error al filtrar productos" });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    await productsService.deleteProducts(id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error en deleteProducts:", error.message);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

export const createProducts = async (req, res) => {
  try {
    //const { product } = req.body;
    const product = req.body;
    const savedProduct = await productsService.createProducts(product);
    res.status(201).json({
      message: "Producto guardado correctamente",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error en createProducts:", error.message);
    res.status(error.status || 500).json({
      message: error.message || "Error al guardar el producto",
    });
  }
};