import User from "../models/userModel.js";
import ApiError from "../exceptions/ApiError.js";
import ERROR_MESSAGES from "../exceptions/errorMessages.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { hashPassword } from "../utils/hash.js";

class UserService {
  static async getAllUsers() {
    return await User.findAll();
  }

  static async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) throw new ApiError(404, ERROR_MESSAGES.USER_NOT_FOUND);
    return user;
  }

  static async registerUser({ name, email, password, age, address }) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new ApiError(400, ERROR_MESSAGES.EMAIL_EXISTS);
    
    const hashedPassword = await hashPassword(password);
    await User.create({ name, email, password: hashedPassword, age, address });

    return { message: "Register success!" };
  }

  static async loginUser({ email, password }) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new ApiError(401, ERROR_MESSAGES.USER_NOT_FOUND);
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(401, ERROR_MESSAGES.INVALID_CREDENTIALS);
    
    const token = generateToken(user);
    return { token };
  }

  static async updateUserRole(id, role, currentUser) {
    if (currentUser.role !== "admin") throw new ApiError(403, ERROR_MESSAGES.PERMISSION_DENIED);

    const user = await this.getUserById(id);
    user.role = role;
    await user.save();

    return { message: `Successfully updated the user's role for ${id}!` };
  }

  static async deleteUser(id) {
    const user = await this.getUserById(id);
    await user.destroy();
    return `The user with ID ${id} has been successfully deleted!`;
  }
}

export default UserService;
