import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/event.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/auth", authRoutes);
apiRouter.use("/events", eventRoutes);
apiRouter.use("/dashboard", dashboardRoutes);

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("API backend Gestion des événements !");
});

export default app;
