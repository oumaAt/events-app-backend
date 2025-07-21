import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { Event } from "../models/Event.js";
import { User } from "../models/User.js";

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
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Events API", () => {
  it("should create a new event", async () => {
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "Music Festival")
      .field("date", "2025-08-10")
      .field("location", "Paris")
      .field("nbParticipants", 300);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Music Festival");
  });

 it("should return all events", async () => {
  const res = await request(app)
    .post("/api/events/all")
    .send({})
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.data).toBeDefined();
  expect(Array.isArray(res.body.data)).toBe(true);
});


  it("should delete an event", async () => {
    const event = await Event.create({
      title: "Event to delete",
      location: "Test location",
      date: "2025-07-20",
      nbParticipants: 100,
      createdBy: userId,
    });
    const res = await request(app)
      .delete(`/api/events/${event._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);

    const deleted = await Event.findById(event._id);
    expect(deleted).toBeNull();
  });
});
