import { IProduct } from "../models/product.model";

export interface IProductRepository {
  create(data: IProduct): Promise<IProduct>;
  update(data: IProduct): Promise<IProduct>;
  delete(id: string): any;
  find(
    limit: number,
    offset: number
  ): Promise<{ products: IProduct[]; productCount: number }>;
  findOne(id: string): Promise<IProduct>;
}
// for TDD inorder to test it with the MOCK data Interfaces come to PLAY
