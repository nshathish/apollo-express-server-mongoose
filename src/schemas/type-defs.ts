import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Customer {
    id: ID
    name: String
    email: String
  }
  
  type Order {
    id: ID
    total: Float
    customer: Customer
  }
  
  type Query {
    getCustomers: [Customer!]
    getOrders: [Order!]
  }
  
  input CustomerInput {
    name: String!
    email: String!
  }
  
  input OrderInput {
    total: Float!
    customerEmail: String!
  }
  
  type Mutation {
    addCustomer(customer: CustomerInput): Customer
    createOrder(order: OrderInput): Order
  }
  
  
`;
// https://stackoverflow.com/questions/60747549/how-to-split-type-definitions-and-resolvers-into-separate-files-in-apollo-server#:~:text=const%20server%20%3D%20new%20ApolloServer%20%28%7B%20typeDefs%3A%20%2C,need%20to%20use%20type%20extension%20syntax.%20For%20example%3A
export default typeDefs;
