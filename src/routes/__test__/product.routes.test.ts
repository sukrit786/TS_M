import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker";
import productRoutes, { productService } from "../product.routes";
import { Factory } from "rosie";
import { IProduct } from "../../models/product.model";

export const ProductFactory = new Factory<IProduct>()
  .attr("id", faker.string.alphanumeric({ length: 10 }))
  .attr("name", faker.commerce.productName())
  .attr("description", faker.commerce.productDescription())
  .attr("stock", faker.number.int({ min: 10, max: 100 }))
  .attr("price", +faker.commerce.price());

const app = express();
app.use(express.json());
// console.log("why is this", productRoutes);
app.use(productRoutes);

const mockRequest = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    price: +faker.commerce.price(),
  };
};

describe("Catalog Routes", () => {
  describe("POST /product", () => {
    test("should create product successfully", async () => {
      const requestBody = mockRequest();
      jest
        .spyOn(productService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(requestBody));
      const response = await request(app)
        .post("/product")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
      expect(response.body).toEqual(requestBody);
    });

    test("should response with validation error 400", async () => {
      const requestBody = mockRequest();
      const response = await request(app)
        .post("/product")
        .send({ ...requestBody, name: "" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body).toEqual("name should not be empty");
    });

    test("should response with an internal error code 500", async () => {
      const requestBody = mockRequest();
      jest
        .spyOn(productService, "createProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("unable to create product"))
        );
      const response = await request(app)
        .post("/product")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to create product");
    });
  });

  describe("PATCH /product/:id", () => {
    test("should update product successfully", async () => {
      const product = ProductFactory.build();
      const requestBody = {
        name: product.name,
        price: product.price,
        stock: product.stock,
      };
      jest
        .spyOn(productService, "updateProduct")
        .mockImplementationOnce(() => Promise.resolve(product));
      const response = await request(app)
        .patch(`/product/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });

    test("should response with validation error 400", async () => {
      const product = ProductFactory.build();
      const requestBody = {
        name: product.name,
        price: -1,
        stock: product.stock,
      };
      const response = await request(app)
        .patch(`/product/${product.id}`)
        .send({ ...requestBody })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body).toEqual("price must not be less than 1");
    });

    test("should response with an internal error code 500", async () => {
      const product = ProductFactory.build();
      const requestBody = mockRequest();
      jest
        .spyOn(productService, "updateProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("unable to update product"))
        );
      const response = await request(app)
        .patch(`/product/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to update product");
    });
  });

  describe("GET /product?limit=0&offset=0", () => {
    test("should return a range of product based on limit and offset", async () => {
      const randomLimit = faker.number.int({ min: 10, max: 50 });
      const product = ProductFactory.buildList(randomLimit);
      jest
        .spyOn(productService, "fetchProducts")
        .mockImplementationOnce(() =>
          Promise.resolve({ products: product, productCount: 5 })
        );
      const response = await request(app)
        .get(`/products?limit=${randomLimit}&offset=0`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ products: product, productCount: 5 });
    });
  });

  describe("GET /products/:id", () => {
    test("should return a product by id", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(productService, "getProduct")
        .mockImplementationOnce(() => Promise.resolve(product));
      const response = await request(app)
        .get(`/products/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });
  });

  describe("DELETE /products/:id", () => {
    test("should delete a product by id", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(productService, "deleteProduct")
        .mockImplementationOnce(() => Promise.resolve({ id: product.id }));
      const response = await request(app)
        .delete(`/products/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: product.id });
    });
  });
});
