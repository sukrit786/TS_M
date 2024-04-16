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
exports.productService = void 0;
const express_1 = __importDefault(require("express"));
const product_service_1 = require("../service/product.service");
const product_repository_1 = require("../repository/product.repository");
const requestValidators_1 = require("../validators/requestValidators");
const product_dto_1 = require("../dto/product.dto");
const router = express_1.default.Router();
exports.productService = new product_service_1.ProductService(new product_repository_1.ProductRepository());
// endpoints
router.post("/product", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { errors, input } = yield (0, requestValidators_1.RequestValidator)(product_dto_1.CreateProductRequest, req.body);
        if (errors)
            return res.status(400).json(errors);
        const data = yield exports.productService.createProduct(input);
        return res.status(201).json(data);
    }
    catch (error) {
        console.log(error);
        const err = error;
        return res.status(500).json(err.message);
    }
}));
router.patch("/product/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { errors, input } = yield (0, requestValidators_1.RequestValidator)(product_dto_1.UpdateProductRequest, req.body);
        const id = req.params.id;
        if (errors)
            return res.status(400).json(errors);
        const data = yield exports.productService.updateProduct(Object.assign({ id }, input));
        return res.status(200).json(data);
    }
    catch (error) {
        const err = error;
        return res.status(500).json(err.message);
    }
}));
router.get("/products", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query["limit"]);
    const offset = Number(req.query["offset"]);
    try {
        const data = yield exports.productService.fetchProducts(limit, offset);
        return res.status(200).json(data);
    }
    catch (error) {
        const err = error;
        return res.status(500).json(err.message);
    }
}));
router.get("/products/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const data = yield exports.productService.getProduct(id);
        return res.status(200).json(data);
    }
    catch (error) {
        const err = error;
        return res.status(500).json(err.message);
    }
}));
router.delete("/products/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const data = yield exports.productService.deleteProduct(id);
        return res.status(200).json(data);
    }
    catch (error) {
        const err = error;
        return res.status(500).json(err.message);
    }
}));
exports.default = router;
