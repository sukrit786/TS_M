"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uri = "mongodb+srv://maintoto51:adminisrich@cluster0.lik76rv.mongodb.net/ecom?retryWrites=true&w=majority&appName=Cluster0";
const initializeMongo = () => {
    /** Connect to Mongo */
    mongoose_1.default
        .connect(uri, { retryWrites: true, w: "majority" })
        .then(() => {
        console.log("Mongo connected successfully.");
    })
        .catch((error) => console.log(error));
};
exports.default = initializeMongo;
