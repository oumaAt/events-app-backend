import express from "express";
import { register, login } from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import { validate } from "../middlewares/validate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("photo"),
  validate(registerSchema),
  register
);
router.post("/login", validate(loginSchema), login);

export default router;
