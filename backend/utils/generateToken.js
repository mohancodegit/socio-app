import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};
