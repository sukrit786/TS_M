import { IProductRepository } from "../interface/productRepository.interface";

export class ProductService {
  private _repo: IProductRepository;
  constructor(repository: IProductRepository) {
    this._repo = repository;
  }

  async createProduct(input: any) {
    // TO:DO validator already validates you
    if (input.price <= 0) {
      throw new Error("price is invalid");
    }
    const data = await this._repo.create(input);
    if (!data.id) {
      throw new Error("unable to create product");
    }

    return data;
  }

  async updateProduct(input: any) {
    if (!input.id) {
      throw new Error("product id is missing");
    }
    let existingProduct = await this._repo.findOne(input.id);
    if (!existingProduct.id) {
      throw new Error("product does not exist");
    }

    const data = await this._repo.update(input);

    if (!data.id) {
      throw new Error("unable to update product");
    }

    return data;
  }

  async fetchProducts(limit: number, offset: number) {
    let products = await this._repo.find(limit, offset);
    return products;
  }

  async getProduct(id: string) {
    let product = await this._repo.findOne(id);
    return product;
  }

  async deleteProduct(id: string) {
    let response = await this._repo.delete(id);
    return response;
  }
}
