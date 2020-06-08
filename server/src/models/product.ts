import { Schema, Document, model } from 'mongoose';

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: Number,
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  qty: {
    type: Number,
    required: true,
    default: 0,
  },
});

interface IProductSchema extends Document {
  title: string;
  description?: string;
  price: number;
  discount?: number;
  qty: number;
}

export interface IProduct extends IProductSchema {
  category: string[];
}

export default model<IProduct>('Product', ProductSchema);
