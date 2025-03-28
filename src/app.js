import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import { connectDB } from "./config/database.js";
import dotenv from "dotenv";
import ApiError from "./exceptions/ApiError.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
dotenv.config()

const app = express();
connectDB();

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ 
  schema,
  formatError: (err) => {
    if (err.originalError instanceof ApiError) {
      return {
        message: err.message,
        code: err.originalError.statusCode,
      };
    }
    return {
      message: "Error System!",
      code: "INTERNAL_SERVER_ERROR",
    };
  },
  context: ({ req }) => {  
    return { req };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

export default app;
