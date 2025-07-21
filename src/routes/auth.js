import express from "express";
import { register, login } from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import { validate } from "../middlewares/validate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user with optional photo upload
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Optional profile photo file
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass1!
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

router.post(
  "/register",
  upload.single("photo"),
  validate(registerSchema),
  register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: "Password1!"
 *     responses:
 *       200:
 *         description: Login successful, returns token
 *       400:
 *         description: Validation error or invalid credentials
 */
router.post("/login", validate(loginSchema), login);

export default router;
