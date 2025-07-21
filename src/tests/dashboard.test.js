import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { User } from "../models/User.js";
import { Event } from "../models/Event.js";

let token;
let userId;

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/events_test");
  await Event.deleteMany({});
  await User.deleteMany({});

  const res = await request(app).post("/api/auth/register").send({
    firstname: "Test",
    lastname: "User",
    email: "testuser@example.com",
    password: "Password1!",
  });

  token = res.body.token;
  userId = res.body.user._id;

  await Event.create([
    {
      title: "Event A",
      date: "2025-07-25",
      location: "Paris",
      nbParticipants: 50,
      status: "scheduled",
      createdBy: userId,
    },
    {
      title: "Event B",
      date: "2025-07-26",
      location: "Lyon",
      nbParticipants: 80,
      status: "done",
      createdBy: userId,
    },
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Dashboard API", () => {
  it("should return dashboard stats", async () => {
    const res = await request(app)
      .post("/api/dashboard/stats")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.totalEvents).toBeDefined();
    expect(res.body.eventsByStatus).toBeDefined();
    expect(Array.isArray(res.body.eventsByStatus)).toBe(true);
  });
});
