import request from "supertest";
import app from "../app.js";

describe("GET /", () => {
  test("debe responder con status 200 y un mensaje", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("API REST - Proyecto Final");
  });
});
