import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, name) =>
  jwt.sign({ id: userId, name }, process.env.JWT_SECRET, { expiresIn: "1h" });

export const generateRefreshToken = (userId) =>
  jwt.sign({ id: userId }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
