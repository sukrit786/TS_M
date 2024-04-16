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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
class ProductRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield product_model_1.default.create(data);
            return resp;
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = (yield product_model_1.default.findByIdAndUpdate(data.id, Object.assign({}, data), { new: true }));
            return resp;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield product_model_1.default.findByIdAndDelete(id);
            return { msg: "Item deleted" };
        });
    }
    find(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = product_model_1.default.find({}).limit(limit).skip(offset);
            return products;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = (yield product_model_1.default.findOne({ _id: id }));
            return product;
        });
    }
}
exports.ProductRepository = ProductRepository;
