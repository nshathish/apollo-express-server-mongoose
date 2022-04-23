import { model, Schema, Types } from 'mongoose';
import { Customer } from './customer';

export interface IOrder {
  total: number;
  customerId: any;
}

const orderSchema = new Schema<IOrder>({
  total: { type: Number, required: true },
  customerId: {
    type: Types.ObjectId,
    ref: Customer,
    required: true,
    index: true,

  },
});

export const Order = model<IOrder>('Order', orderSchema, 'orders');
