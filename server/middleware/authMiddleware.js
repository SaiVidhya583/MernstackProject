import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Auth failed!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Auth failed!" });
  }
};
