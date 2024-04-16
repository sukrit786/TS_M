import express from "express";
import productRouter from "./routes/product.routes";
// console.log("am 1,", productRouter);
const app = express();

app.use(express.json());
app.use("/", productRouter);

export default app;
