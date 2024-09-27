import mongoose from "mongoose";
import { expect } from "chai";
import supertest from "supertest";

import config from "../src/config/config.js";

const requester = supertest(`${config.AppUrl}:${config.port}`);
mongoose.connect(config.mongoUrl);

describe("Testing E-commerce", async function () {
  let cookie;
  let cookieUser;
  let productId;
  let cartId;
  let productId1;
  let productId2;
  let productId3;

  before(async function () {
    const loginResponse = await requester.post("/api/sessions/login").send({
      email: "admin@gmail.com",
      password: "admin",
    });
    const cookies = loginResponse.headers['set-cookie'];
    if (cookies) {
      cookie = cookies[0].split(';')[0];
    }
    const loginResponseUser = await requester.post("/api/sessions/login").send({
      email: "test@gmail.com",
      password: "test",
    });
    const cookiesUser = loginResponseUser.headers['set-cookie'];
    if (cookies) {
      cookieUser = cookiesUser[0].split(';')[0];
    }
  });

  describe("Test de productos", function () {
    this.timeout(5000);

    it("POST /api/products debe crear un producto correctamente", async function () {
      const productMock = {
        title: "producto test 2",
        description: "descripcion del producto test 2",
        code: 10,
        price: 300,
        status: true,
        stock: 5,
        category: "test",
        thumbnail: [],
      };
      const { statusCode, ok, body } = await requester
        .post("/api/products")
        .set("Cookie", cookie)
        .send(productMock);
      expect(statusCode).to.equal(201);
      expect(ok).to.be.true;
      expect(body.data).to.have.property("title", "producto test 2");
      productId = body.data.id
    });

    it("GET /api/products debe obtener todos los productos correctamente", async function () {
      const { statusCode, ok, body } = await requester
        .get("/api/products")
        .set("Cookie", cookie)
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data.data).to.be.an("array");
    });

    it("GET /api/products/:pid debe obtener un producto por su ID", async function () {
      const { statusCode, ok, body } = await requester
        .get(`/api/products/${productId}`)
        .set("Cookie", cookie)
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data).to.have.property("id", productId);
      expect(body.data).to.have.property("title");
      expect(body.data).to.have.property("description");
    });

    it("PUT /api/products/:pid debe actualizar un producto por su ID", async function () {
      const updateMock = {
        title: "producto actualizado",
        description: "descripcion actualizada",
        price: 400,
        stock: 10,
      };
      const { statusCode, ok, body } = await requester
        .put(`/api/products/${productId}`)
        .set("Cookie", cookie)
        .send(updateMock);
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data).to.equal("Se actualizo el producto");

    });

    it("DELETE /api/products/:pid debe eliminar un producto por su ID", async function () {
      const { statusCode, ok, body } = await requester
        .delete(`/api/products/${productId}`)
        .set("Cookie", cookie)
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
    });
  });



  describe("Test de sessions", function () {
    this.timeout(5000);

    it("POST /api/sessions/login debe poder loguear al admin", async function () {
      const { statusCode, ok, body } = await requester
        .post("/api/sessions/login")
        .send({
          email: "admin@gmail.com",
          password: "admin",
        })
        .set("Cookie", cookie)
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data).to.equal("Login correct");
    });

    it("POST /api/sessions/register debe registrar un usuario", async function () {
      const { statusCode, ok, body } = await requester
        .post("/api/sessions/register")
        .send({
          "first_name": "super",
          "last_name": "test",
          "age": 25,
          "email": "supertest@gmail.com",
          "password": "supertest"
        })
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data).to.equal("Register correct");
    });
    it("GET /api/sessions/logout debe cerrar sesion del usuario", async function () {
      const { statusCode, ok, body } = await requester
        .get("/api/sessions/logout")
        .set("Cookie", cookie)
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data).to.equal("Logout correct");
    });
    it("GET /api/sessions/current debe obtener la informacion del usuario", async function () {
      const { statusCode, ok, body } = await requester
        .get("/api/sessions/current")
        .set("Cookie", cookieUser)
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data).to.have.property("email", "test@gmail.com");
      cartId = body.data.cart.id;
    });
  });

  describe("Test de carts", function () {
    this.timeout(5000);
    before(async function () {
      
      const productMock1 = {
        title: "producto test 1",
        description: "descripcion del producto test 1",
        code: 11,
        price: 100,
        status: true,
        stock: 5,
        category: "test",
        thumbnail: [],
      };

      const productMock2 = {
        title: "producto test 2",
        description: "descripcion del producto test 2",
        code: 12,
        price: 200,
        status: true,
        stock: 10,
        category: "test",
        thumbnail: [],
      };

      const productMock3 = {
        title: "producto test 3",
        description: "descripcion del producto test 3",
        code: 13,
        price: 300,
        status: true,
        stock: 15,
        category: "test",
        thumbnail: [],
      };
      
      const createProduct1 = await requester
        .post("/api/products")
        .set("Cookie", cookie)
        .send(productMock1);
        productId1 = createProduct1.body.data.id;

      const createProduct2 = await requester
        .post("/api/products")
        .set("Cookie", cookie)
        .send(productMock2);
      productId2 = createProduct2.body.data.id;

      const createProduct3 = await requester
        .post("/api/products")
        .set("Cookie", cookie)
        .send(productMock3);
      productId3 = createProduct3.body.data.id;
    });
    it("GET /api/carts debe obtener todos los carritos correctamente con permisos de admin", async function () {
      const { statusCode, ok, body } = await requester
        .get("/api/carts")
        .set("Cookie", cookie)
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data).to.be.an("array");
    });
    it("GET /api/carts/:cid debe obtener un carrito por su ID (permiso de user)", async function () {
      const { statusCode, ok, body } = await requester
        .get(`/api/carts/${cartId}`)
        .set("Cookie", cookieUser)
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data).to.have.property("id", cartId);
    });
    it("POST /api/carts/:cid/product/:pid debe agregar un producto al carrito correctamente (cart de user)", async function () {
      const { statusCode, ok, body } = await requester
        .post(`/api/carts/${cartId}/product/${productId1}`)
        .set("Cookie", cookieUser)
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data).to.equal("Se agrego el producto al carrito");
    });

    it("PUT /api/carts/:cid/product/:pid debe actualizar la cantidad del producto del carrito corectamente por sus IDs", async function () {
      const updateMock = 
        {
          "quantity": 15
      };
      const { statusCode, ok, body } = await requester
        .put(`/api/carts/${cartId}/product/${productId1}`)
        .set("Cookie", cookieUser)
        .send(updateMock);
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data).to.equal("Se actualizo el producto del carrito");

    });
    it("PUT /api/carts/:cid debe actualizar el cart por su ID", async function () {
      const updateMock = 
        {
    "products": [
        {
            "prodId": `${productId2}`, 
            "quantity": 50
        },
        {
            "prodId":  `${productId3}`, 
            "quantity": 7
        }
    ]

      };
      const { statusCode, ok, body } = await requester
        .put(`/api/carts/${cartId}`)
        .set("Cookie", cookieUser)
        .send(updateMock);
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data).to.equal("Se actualizo el carrito");

    });
     it("DELETE /api/carts/:cid/product/:pid debe eliminar un producto del carrito correctamente por sus IDs", async function () {
      const { statusCode, ok, body } = await requester
        .delete(`/api/carts/${cartId}/product/${productId2}`)
        .set("Cookie", cookieUser)
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;
      expect(body.data).to.equal("Se Se elimino el producto del carrito");
    });
  });
});
