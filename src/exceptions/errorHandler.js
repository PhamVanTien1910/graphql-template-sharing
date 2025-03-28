import { ApolloError } from "apollo-server-express";

const errorHandler = (error) => {
  console.error("GraphQL Error:", error);

  if (error.originalError instanceof ApolloError) {
    return error;
  }
  return new ApolloError("Error System", "INTERNAL_SERVER_ERROR");
};

export default errorHandler;
