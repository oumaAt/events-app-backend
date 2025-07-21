import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from "../services/userService.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { email, ...rest } = req.body;
    let user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }
    user = await createUser(req.body);
    const token = generateToken(user._id);

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred." });
  }
};
