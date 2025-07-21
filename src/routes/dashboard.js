import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getDashboardStats } from "../controllers/dashbardController.js";

const router = express.Router();

router.post("/stats", verifyToken, getDashboardStats);

export default router;
