import { faker } from "@faker-js/faker";
import { IProductRepository } from "../../interface/productRepository.interface";
import { MockProductRepository } from "../../repository/mockProduct.repository";
import { ProductService } from "../product.service";
import { IProduct } from "../../models/product.model";
import { Factory } from "rosie";

// generates random products
const productFactory = new Factory<IProduct>()
  .attr("id", faker.string.alphanumeric({ length: 10 }))
  .attr("name", faker.commerce.productName())
  .attr("description", faker.commerce.productDescription())
  .attr("stock", faker.number.int({ min: 1, max: 1000 }))
  .attr("price", +faker.commerce.price());

async function generateMockData(rest: any) {
  return {
    name: faker.commerce.productName(),
    price: +faker.commerce.price(),
    stock: faker.number.int({ min: 0, max: 1000 }),
    description: faker.commerce.productDescription(),
    ...rest,
  };
}

describe("productService", () => {
  let repository: IProductRepository;
  // things to do before you run the test
  beforeEach(() => {
    repository = new MockProductRepository();
  });

  describe("createProduct", () => {
    test("should create a product", async () => {
      const service = new ProductService(repository);
      let body = await generateMockData({});
      const result = await service.createProduct(body);
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number), // TO:DO support for FLOATS
        stock: expect.any(Number),
        description: expect.any(String),
      });
    });

    test("should throw an error if product unable to create", async () => {
      const service = new ProductService(repository);
      let body = await generateMockData({});
      // This allows Jest to keep track of calls made to the create method and intercept them for testing purposes. // mockImplementation with mock the function once and replace the object values with empty object
      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as IProduct));

      await expect(service.createProduct(body)).rejects.toThrow(
        "unable to create product"
      );
    });

    test("should throw an error if product already exists", async () => {
      const service = new ProductService(repository);
      let body = await generateMockData({});

      // This allows Jest to keep track of calls made to the create method and intercept them for testing purposes. // mockImplementation with mock the function once and replace the object values with empty object
      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product already exists"))
        );

      await expect(service.createProduct(body)).rejects.toThrow(
        "product already exists"
      );
    });

    test("should throw an error if price is invalid", async () => {
      const service = new ProductService(repository);
      let body = await generateMockData({});
      body.price = 0;

      await expect(service.createProduct(body)).rejects.toThrow(
        "price is invalid"
      );
    });
  });

  describe("updateProduct", () => {
    test("should update a product", async () => {
      const service = new ProductService(repository);
      let body = await generateMockData({
        id: faker.number.int({ min: 10, max: 660 }),
      });
      const result = await service.updateProduct(body);
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number), // TO:DO support for FLOATS
        stock: expect.any(Number),
        description: expect.any(String),
      });
    });

    test("should throw an error product does not exist", async () => {
      const service = new ProductService(repository);
      let body = await generateMockData({ id: "6a66" });

      await expect(service.updateProduct(body)).rejects.toThrow(
        "product does not exist"
      );
    });
  });

  describe("fetchProducts", () => {
    // use .only to run just single test case
    test("should get products by offset and limit", async () => {
      const service = new ProductService(repository);
      let randomLimit = faker.number.int({ min: 1, max: 100 });
      const products = productFactory.buildList(randomLimit);
      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.resolve({ products: products, productCount: 5 })
        );

      const result = await service.fetchProducts(randomLimit, 0);

      expect(result.products.length).toBe(randomLimit);
      expect(result).toMatchObject({ products: products, productCount: 5 });
    });
  });

  describe("getProduct", () => {
    // use .only to run just single test case
    test("should get product by id", async () => {
      const service = new ProductService(repository);
      const product = productFactory.build(); //generated single product

      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() => Promise.resolve(product));

      const result = await service.getProduct(product.id!);
      expect(result).toMatchObject(product);
    });
  });

  describe("deleteProduct", () => {
    // use .only to run just single test case
    test("should delete product by id", async () => {
      const service = new ProductService(repository);
      const product = productFactory.build(); //generated single product

      jest
        .spyOn(repository, "delete")
        .mockImplementationOnce(() => Promise.resolve({ id: product.id }));

      const result = await service.deleteProduct(product.id!);
      expect(result).toMatchObject({
        id: product.id,
      });
    });
  });
  // clear the thing you needed to run the test [cleanup]
  afterEach(() => {
    repository = {} as MockProductRepository;
  });
});
