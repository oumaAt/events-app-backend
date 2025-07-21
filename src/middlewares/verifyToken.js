import jwt from "jsonwebtoken";
import { findUserById } from "../services/userService.js";

export const verifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await findUserById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Invalid or Expired Token" });
    }
  } else {
    res.status(401).json({ message: "Token missing" });
  }
};
