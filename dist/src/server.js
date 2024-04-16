"use strict";
// DDD Domain Driven Design
// kind of business ie Ecom, Banking, Shipping related developement
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
exports.StartServer = void 0;
// == Service1 == //
// User
// Customer -- Profile
// == Service2 == //
// Product/ catalog -- info about product -- id, title, description
//  |
//   -- categories
//   -- inventory --can be further broken to microservices
//   -- price --can be further broken to microservices
// ==Service3 == //
// Order
// Order Item -- Order Product
// ==Service4==
// Payment
// Payment -- Transaction
// Payment -- Shipping
// Express App => POST/ product => Service => Repository
const expressApp_1 = __importDefault(require("./expressApp"));
const db_1 = __importDefault(require("./db"));
const PORT = process.env.PORT || 3001;
const StartServer = () => __awaiter(void 0, void 0, void 0, function* () {
    expressApp_1.default.listen(PORT, () => {
        console.log("Application running on PORT: ", PORT);
    });
});
exports.StartServer = StartServer;
(0, db_1.default)();
(0, exports.StartServer)();
