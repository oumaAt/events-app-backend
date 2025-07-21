import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getDashboardStats } from "../controllers/dashbardController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics
 */

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics object
 */

router.post("/stats", verifyToken, getDashboardStats);

export default router;
