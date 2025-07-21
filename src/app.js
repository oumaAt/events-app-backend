import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/auth", authRoutes);

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("API backend Gestion des événements !");
});

export default app;
