import { model, Schema } from 'mongoose';

export interface ICustomer {
  id: string;
  name: string;
  email: string;
}

const customerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export const Customer = model<ICustomer>('Customer', customerSchema, 'customers');
