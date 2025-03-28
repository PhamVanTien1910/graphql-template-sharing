import { verifyToken } from "../utils/jwt.js";
import ApiError from "../exceptions/ApiError.js";

const authMiddleware = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) throw new ApiError(401, "No token provided!");

  const token = authHeader.split(" ")[1];
  if (!token) throw new ApiError(401, "Invalid token!");

  // decode and save in context
  context.user = verifyToken(token); 
};

export default authMiddleware;
