import express, { NextFunction, Request, Response } from "express";
import { ProductService } from "../service/product.service";
import { ProductRepository } from "../repository/product.repository";
import { RequestValidator } from "../validators/requestValidators";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";

const router = express.Router();

export const productService = new ProductService(new ProductRepository());

// endpoints
router.post(
  "/product",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        CreateProductRequest,
        req.body
      );

      if (errors) return res.status(400).json(errors);
      const data = await productService.createProduct(input);
      return res.status(201).json(data);
    } catch (error) {
      console.log(error);
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

router.patch(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        UpdateProductRequest,
        req.body
      );

      const id = req.params.id;

      if (errors) return res.status(400).json(errors);

      const data = await productService.updateProduct({ id, ...input });
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

router.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query["limit"]);
    const offset = Number(req.query["offset"]);
    try {
      const data = await productService.fetchProducts(limit, offset);
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

router.get(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const data = await productService.getProduct(id);
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

router.delete(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const data = await productService.deleteProduct(id);
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

export default router;
