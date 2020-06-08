import { Schema, Document, model } from 'mongoose';
import { IProduct } from './product';

const CategorySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  qty: {
    type: Number,
    default: 0,
  },
});

interface ICategorySchema extends Document {
  name: string;
  qty: number;
}

export interface ICategory extends ICategorySchema {
  products?: IProduct[];
}

export default model<ICategory>('Category', CategorySchema);
