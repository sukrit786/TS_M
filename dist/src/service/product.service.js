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
exports.ProductService = void 0;
class ProductService {
    constructor(repository) {
        this._repo = repository;
    }
    createProduct(input) {
        return __awaiter(this, void 0, void 0, function* () {
            // TO:DO validator already validates you
            if (input.price <= 0) {
                throw new Error("price is invalid");
            }
            const data = yield this._repo.create(input);
            if (!data.id) {
                throw new Error("unable to create product");
            }
            return data;
        });
    }
    updateProduct(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.id) {
                throw new Error("product id is missing");
            }
            let existingProduct = yield this._repo.findOne(input.id);
            if (!existingProduct.id) {
                throw new Error("product does not exist");
            }
            const data = yield this._repo.update(input);
            if (!data.id) {
                throw new Error("unable to update product");
            }
            return data;
        });
    }
    fetchProducts(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = yield this._repo.find(limit, offset);
            return products;
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield this._repo.findOne(id);
            return product;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this._repo.delete(id);
            return response;
        });
    }
}
exports.ProductService = ProductService;
