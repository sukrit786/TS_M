"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const mockProduct_repository_1 = require("../../repository/mockProduct.repository");
const product_service_1 = require("../product.service");
const rosie_1 = require("rosie");
// generates random products
const productFactory = new rosie_1.Factory()
    .attr("id", faker_1.faker.string.alphanumeric({ length: 10 }))
    .attr("name", faker_1.faker.commerce.productName())
    .attr("description", faker_1.faker.commerce.productDescription())
    .attr("stock", faker_1.faker.number.int({ min: 1, max: 1000 }))
    .attr("price", +faker_1.faker.commerce.price());
function generateMockData(rest) {
    return __awaiter(this, void 0, void 0, function* () {
        return Object.assign({ name: faker_1.faker.commerce.productName(), price: +faker_1.faker.commerce.price(), stock: faker_1.faker.number.int({ min: 0, max: 1000 }), description: faker_1.faker.commerce.productDescription() }, rest);
    });
}
describe("productService", () => {
    let repository;
    // things to do before you run the test
    beforeEach(() => {
        repository = new mockProduct_repository_1.MockProductRepository();
    });
    describe("createProduct", () => {
        test("should create a product", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new product_service_1.ProductService(repository);
            let body = yield generateMockData({});
            const result = yield service.createProduct(body);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number), // TO:DO support for FLOATS
                stock: expect.any(Number),
                description: expect.any(String),
            });
        }));
        test("should throw an error if product unable to create", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new product_service_1.ProductService(repository);
            let body = yield generateMockData({});
            // This allows Jest to keep track of calls made to the create method and intercept them for testing purposes. // mockImplementation with mock the function once and replace the object values with empty object
            jest
                .spyOn(repository, "create")
                .mockImplementationOnce(() => Promise.resolve({}));
            yield expect(service.createProduct(body)).rejects.toThrow("unable to create product");
        }));
        test("should throw an error if product already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new product_service_1.ProductService(repository);
            let body = yield generateMockData({});
            // This allows Jest to keep track of calls made to the create method and intercept them for testing purposes. // mockImplementation with mock the function once and replace the object values with empty object
            jest
                .spyOn(repository, "create")
                .mockImplementationOnce(() => Promise.reject(new Error("product already exists")));
            yield expect(service.createProduct(body)).rejects.toThrow("product already exists");
        }));
        test("should throw an error if price is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new product_service_1.ProductService(repository);
            let body = yield generateMockData({});
            body.price = 0;
            yield expect(service.createProduct(body)).rejects.toThrow("price is invalid");
        }));
    });
    describe("updateProduct", () => {
        test("should update a product", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new product_service_1.ProductService(repository);
            let body = yield generateMockData({
                id: faker_1.faker.number.int({ min: 10, max: 660 }),
            });
            const result = yield service.updateProduct(body);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number), // TO:DO support for FLOATS
                stock: expect.any(Number),
                description: expect.any(String),
            });
        }));
        test("should throw an error product does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new product_service_1.ProductService(repository);
            let body = yield generateMockData({ id: "6a66" });
            yield expect(service.updateProduct(body)).rejects.toThrow("product does not exist");
        }));
    });
    describe("fetchProducts", () => {
        // use .only to run just single test case
        test("should get products by offset and limit", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new product_service_1.ProductService(repository);
            let randomLimit = faker_1.faker.number.int({ min: 1, max: 100 });
            const products = productFactory.buildList(randomLimit);
            jest
                .spyOn(repository, "find")
                .mockImplementationOnce(() => Promise.resolve(products));
            const result = yield service.fetchProducts(randomLimit, 0);
            expect(result.length).toBe(randomLimit);
            expect(result).toMatchObject(products);
        }));
    });
    describe("getProduct", () => {
        // use .only to run just single test case
        test("should get product by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new product_service_1.ProductService(repository);
            const product = productFactory.build(); //generated single product
            jest
                .spyOn(repository, "findOne")
                .mockImplementationOnce(() => Promise.resolve(product));
            const result = yield service.getProduct(product.id);
            expect(result).toMatchObject(product);
        }));
    });
    describe("deleteProduct", () => {
        // use .only to run just single test case
        test("should delete product by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const service = new product_service_1.ProductService(repository);
            const product = productFactory.build(); //generated single product
            jest
                .spyOn(repository, "delete")
                .mockImplementationOnce(() => Promise.resolve({ id: product.id }));
            const result = yield service.deleteProduct(product.id);
            expect(result).toMatchObject({
                id: product.id,
            });
        }));
    });
    // clear the thing you needed to run the test [cleanup]
    afterEach(() => {
        repository = {};
    });
});
