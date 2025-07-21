import { create, deleteOne, findAll } from "../services/eventService.js";

export const getAllEvents = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { sort, title, location, date, status, category } = req.body;

    const filter = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (location) filter.location = { $regex: location, $options: "i" };
    if (date) filter.date = { $gte: new Date(date) };
    if (status) filter.status = status;
    if (category) filter.category = category;

    const events = await findAll(filter, {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: sort || "-date",
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error in getAllEvents:", error);
    res.status(500).json({ message: "Server error while retrieving events." });
  }
};

export const createEvent = async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const newEvent = await create({ ...req.body, imageUrl }, req.user.id);
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding a new event." });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await deleteOne(eventId);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error while deleting an event.",
    });
  }
};
