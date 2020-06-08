import { Schema, Document, model } from 'mongoose';
import { IProduct } from './product';

const OrderItemSchema = Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  qty: {
    type: Number,
    default: 0,
  },
});

const ShippingSchema = Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const OrderSchema = Schema(
  {
    items: [OrderItemSchema],
    shipping: ShippingSchema,
    payment: { type: String, required: true },
    firstName: String,
    lastName: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tel: {
      type: String,
      required: true,
    },
    shippingPrice: { type: Number },
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

interface IShipping {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder extends Document {
  items: IProduct[];
  user?: IUser;
  firstName: string;
  lastName: string;
  shipping: IShipping;
  payment: string;
  tel: string;
  shippingPrice: number;
  itemsPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
}

export default model<IOrder>('Order', OrderSchema);
