import mongoose, { model, Schema } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  id?: string;
}

// export Interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  //   id: { type: mongoose.Types.ObjectId },
});

export default model<IProduct>("Product", ProductSchema);
