"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// export Interface IProductModel extends IProduct, Document {}
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    //   id: { type: mongoose.Types.ObjectId },
});
exports.default = (0, mongoose_1.model)("Product", ProductSchema);
