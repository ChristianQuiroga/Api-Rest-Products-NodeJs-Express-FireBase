import request from "supertest";
import app from "../app.js";

let token;
let productId;
let productSku;
// siempre vamos a estar conectados con las credenciales que pasamos, para probar los métodos
beforeAll(async () => {
  const loginResponse = await request(app).post("/api/auth/login").send({
    email: "user@email.com",
    password: "strongPass123",
  });

  token = loginResponse.body.token;
});

describe("CRUD /api/products", () => {
  test("GET /api/products debe devolver un array", async () => {
    const response = await request(app).get("/api/products");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Este par de test POST y GET van juntos, primero creamos un producto y luego verificamos que se haya creado correctamente
  test("POST /api/products debe crear un producto", async () => {
    const response = await request(app)
      .post("/api/products/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Producto de Test CRUD",
        price: 1000,
        category: "Category Test",
        description: "Category Description ",
        stock: 10,
      });

    console.log("STATUS:", response.statusCode);
    console.log("BODY:", response.body);
    console.log("TEXT:", response.text);

    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("Producto de Test CRUD");
    expect(response.body.price).toBe(1000);
    expect(response.body.category).toBe("Category Test");
    expect(response.body.description).toBe("Category Description");
    expect(response.body.stock).toBe(10);
    expect(response.body.sku).toBeDefined();

    productId = response.body.id;
    productSku = response.body.sku;
  });
  test("GET /api/products/:id debe devolver el producto creado", async () => {
    const response = await request(app).get(`/api/products/${productId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(productId);
    expect(response.body.name).toBe("Producto de Test CRUD");
  });

  // getProductBySku test
  test("GET /api/products/sku/:idSku debe devolver el producto creado", async () => {
    const response = await request(app).get(`/api/products/sku/${productSku}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(productId);
    expect(response.body.sku).toBe(productSku);
    expect(response.body.name).toBe("Producto de Test CRUD");
  });

  //
  test("PUT /api/products/:id debe actualizar el producto creado", async () => {
    const response = await request(app)
      .put(`/api/products/update/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Producto test actualizado",
        price: 2000,
        category: "Category Test",
        description: "Category Description",
        stock: 5,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(productId);
    expect(response.body.name).toBe("Producto test actualizado");
    expect(response.body.price).toBe(2000);
    expect(response.body.stock).toBe(5);
    expect(response.body.category).toBe("Category Test");
    expect(response.body.description).toBe("Category Description");
  });

  // este Par test delete van juntos, primero eliminamos el producto y luego verificamos que ya no existe
  test("DELETE /api/products/:id debe eliminar el producto creado", async () => {
    const response = await request(app)
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Producto eliminado correctamente");
  });
  test("GET /api/products/:id debe devolver 404 después de eliminar el producto", async () => {
    const response = await request(app).get(`/api/products/${productId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Producto no encontrado");
  });
});
