import express, { Request } from "express";
import productRouter from "./routes/product.routes";
import cors from "cors";
// console.log("am 1,", productRouter);
const app = express();

app.use(cors<Request>());
app.use(express.json());
app.use("/", productRouter);

export default app;
