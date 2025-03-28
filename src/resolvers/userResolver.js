import UserService from "../services/userService.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub(); // Tạo một instance PubSub

const USER_ADDED = "USER_ADDED"; // Định nghĩa sự kiện

const userResolver = {
  Query: {
    users: async () => await UserService.getAllUsers(),
    user: async (_, { id }) => await UserService.getUserById(id),
  },
  Mutation: {
    register: async (_, args) => {
     const newUser = await UserService.registerUser(args)
     pubsub.publish(USER_ADDED, { userAdded: newUser });
     return newUser;
    },
    login: async (_, args) => await UserService.loginUser(args),
    
    updateUserRole: async (_, { id, role }, context) => {
      authMiddleware(context);
      return await UserService.updateUserRole(id, role, context.user);
    },

    deleteUser: async (_, { id }) => await UserService.deleteUser(id),
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterableIterator(["USER_ADDED"]),
    },
  },
};

export default userResolver;
