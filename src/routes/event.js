import express from "express";
import { validate } from "../middlewares/validate.js";
import { createEventSchema } from "../validators/eventValidator.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import upload from "../middlewares/upload.js";
import {
  getAllEvents,
  createEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/all", verifyToken, getAllEvents);
router.post(
  "/",
  verifyToken,
  upload.single("photo"),
  validate(createEventSchema),
  createEvent
);
router.delete("/:id", verifyToken, deleteEvent);

export default router;
