import { IProductRepository } from "../interface/productRepository.interface";
import { IProduct } from "../models/product.model";

// Rather than calling the database for data, for testing we send all the calls here
export class MockProductRepository implements IProductRepository {
  create(data: IProduct): Promise<IProduct> {
    const mockProduct = {
      id: 214,
      ...data,
    } as IProduct;

    return Promise.resolve(mockProduct);
  }
  update(data: IProduct): Promise<IProduct> {
    const mockUpdate = {
      ...data,
    } as IProduct;

    return Promise.resolve(mockUpdate);
  }
  delete(id: string) {
    return Promise.resolve(id);
  }
  find(
    limit: number,
    offset: number
  ): Promise<{ products: IProduct[]; productCount: number }> {
    return Promise.resolve({ products: [], productCount: 5 });
  }
  findOne(id: string): Promise<IProduct> {
    if (id !== "6a66") {
      let x = {
        id: id,
        name: "Cold Drink",
        description: "Cold soda for hot weathers",
        price: 30,
        stock: 5,
      } as IProduct;
      return Promise.resolve(x);
    } else {
      let x = {} as IProduct; // Return null when id is 666;
      return Promise.resolve(x);
    }
  }
}
