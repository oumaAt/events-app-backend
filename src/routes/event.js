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

/**
 * @swagger
 * /events/all:
 *   post:
 *     summary: Get all events with filters and pagination
 *     description: Retrieve a paginated list of events with optional filters like title, location, date, and status.
 *     tags:
 *       - Events
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of events per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     requestBody:
 *       description: Filters for events
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sort:
 *                 type: string
 *                 example: "-date"
 *               title:
 *                 type: string
 *                 example: "Music"
 *               location:
 *                 type: string
 *                 example: "Paris"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-10"
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, canceled]
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Server error
 */

router.post("/all", verifyToken, getAllEvents);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - location
 *               - nbParticipants
 *             properties:
 *               title:
 *                 type: string
 *                 example: Music Festival
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-20
 *               location:
 *                 type: string
 *                 example: Paris
 *               nbParticipants:
 *                 type: integer
 *                 example: 300
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/",
  verifyToken,
  upload.single("photo"),
  validate(createEventSchema),
  createEvent
);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
router.delete("/:id", verifyToken, deleteEvent);

export default router;
