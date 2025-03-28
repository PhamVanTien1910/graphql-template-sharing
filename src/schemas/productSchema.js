import { gql } from "apollo-server-express";

const productSchema = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    stock: Int!
    price: Float!
  }
  type MessageResponse {
    message: String!
  } 
  type Query {
    products: [Product]
    product(id: ID!): Product
  }
  type Mutation {
    addProduct(name: String!, description: String, stock: Int!, price: Float!): Product
    updateProduct(name: String!, description: String, stock: Int!, price: Float!): Product
    deleteProduct(id: ID!): MessageResponse
  }
`
export default productSchema;