import jwt from "jsonwebtoken";
import ApiError from "../exceptions/ApiError.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid token!");
  }
};

export { generateToken, verifyToken };
