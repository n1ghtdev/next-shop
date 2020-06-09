import { Schema, Document, model } from 'mongoose';

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    default: 0,
  },
});

export interface ICategory extends Document {
  name: string;
  qty?: number;
}

export default model<ICategory>('Category', CategorySchema);
