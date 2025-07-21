import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    date: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["conference", "workshop", "concert"],
      default: "concert",
    },
    nbParticipants: { type: Number },
    isPublic: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "cancelled", "done"],
      default: "scheduled",
    },
    imageUrl: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
