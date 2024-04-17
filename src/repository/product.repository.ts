import { Schema, Types } from "mongoose";
import { IProductRepository } from "../interface/productRepository.interface";
import productModel, { IProduct } from "../models/product.model";

export class ProductRepository implements IProductRepository {
  async create(data: IProduct): Promise<IProduct> {
    let resp = await productModel.create(data);
    return resp;
  }
  async update(data: IProduct): Promise<IProduct> {
    let resp = (await productModel.findByIdAndUpdate(
      data.id,
      { ...data },
      { new: true }
    )) as IProduct;
    return resp;
  }
  async delete(id: string) {
    await productModel.findByIdAndDelete(id);
    return { msg: "Item deleted" };
  }
  async find(
    limit: number,
    offset: number
  ): Promise<{ products: IProduct[]; productCount: number }> {
    let count = await productModel.countDocuments({});
    let products = await productModel.find({}).limit(limit).skip(offset);
    return { products, productCount: count };
  }
  async findOne(id: string): Promise<IProduct> {
    let product = (await productModel.findOne({ _id: id })) as IProduct;
    return product;
  }
}
