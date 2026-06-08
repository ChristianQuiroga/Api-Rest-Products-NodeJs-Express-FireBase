import { db } from "./data/data.js";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const productsCollection = collection(db, "Products");

function formatProductDocument(productDoc) {
  const data = productDoc.data();
  return {
    id: productDoc.id,
    name: data.name ?? null,
    price: data.price ?? null,
    category: data.category ?? null,
    description: data.description ?? "",
    stock: data.stock ?? null,
    sku: data.sku ?? null,
  };
}

// Método para obtener todos los productos
export async function getAllProducts() {
  const querySnapshot = await getDocs(productsCollection);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push(formatProductDocument(doc));
  });
  return products;
}

// Método para buscar un producto por su ID
export async function getProductById(id) {
  const productDoc = await getDoc(doc(productsCollection, id));
  if (productDoc.exists()) {
    return formatProductDocument(productDoc);
  } else {
    return null;
  }
}

export async function getProductBySku(sku) {
  const skuQuery = query(productsCollection, where("sku", "==", sku));
  const querySnapshot = await getDocs(skuQuery);

  if (querySnapshot.empty) {
    return null;
  }

  const productDoc = querySnapshot.docs[0];
  return formatProductDocument(productDoc);
}

// Método para generar el siguiente SKU correlativo en Firestore
export async function getNextSku() {
  const querySnapshot = await getDocs(productsCollection);
  let maxSkuNumber = 0;

  querySnapshot.forEach((doc) => {
    const sku = doc.data()?.sku || "";
    const match = /^PROD(\d+)$/.exec(sku);
    if (match) {
      maxSkuNumber = Math.max(maxSkuNumber, Number(match[1]));
    }
  });

  return `PROD${String(maxSkuNumber + 1).padStart(4, "0")}`;
}

// Método para guardar un producto en Firestore
export async function createProducts(product) {
  const productToSave = { ...product };

  /* if (
    !productToSave.sku ||
    typeof productToSave.sku !== "string" ||
    productToSave.sku.trim() === ""
  ) {
    productToSave.sku = await getNextSku();
  } */
  productToSave.sku = await getNextSku();

  const docRef = await addDoc(productsCollection, productToSave);
  return { id: docRef.id, ...productToSave };
}

// Método para eliminar un producto por su ID
export async function deleteProducts(id) {
  await deleteDoc(doc(productsCollection, id));
}
