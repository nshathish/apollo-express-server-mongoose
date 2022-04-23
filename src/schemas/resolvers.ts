import { Customer, ICustomer } from '../db/models/customer';
import { IOrder, Order } from '../db/models/order';

const resolvers = {
  Query: {
    async getCustomers(): Promise<ICustomer[]> {
      return await Customer.find();
    },
    async getOrders(): Promise<IOrder[]> {
      const orders = await Order.aggregate([{
        $lookup: {
          from: 'customers',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer',
        },
      }]);
      return orders.map(o => ({
        id: o._id,
        total: o.total,
        customer: {
          id: o.customer[0]._id,
          ...o.customer[0],
        },
      }));
    },
  },
  Mutation: {
    async addCustomer(_: any, { customer }: { customer: ICustomer }): Promise<ICustomer> {
      const { name, email } = customer;
      const newCustomer = new Customer({ name, email });
      await newCustomer.save();
      return newCustomer;
    },

    async createOrder(_: any, { order }: any): Promise<any> {
      const { customerEmail: email, total } = order;
      const customer = await Customer.findOne({ email }).exec();
      if (!customer) throw new Error(`no customer with ${email} found`);
      const newOrder = new Order({ total, customerId: customer.id });
      await newOrder.save();
      return { id: newOrder.id, total: newOrder.total, customer };
    },
  },
};

export default resolvers;
