import { Event } from "../models/Event.js";

export const create = async (data, userId) => {
  const event = await Event.create({ ...data, createdBy: userId });
  return event;
};

export const findAll = async (filter = {}, options = {}) => {
  try {
    const { page = 1, limit = 10, sort = "-date", select, populate } = options;

    let query = Event.find(filter);

    if (select) query = query.select(select);
    if (populate) query = query.populate(populate);

    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (sort) query = query.sort(sort);

    const events = await query.exec();
    const total = await Event.countDocuments(filter);

    return {
      data: events,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new Error(`Error findAll Events : ${error.message}`);
  }
};

export const deleteOne = async (eventId, userId) => {
  const event = await Event.findByIdAndDelete(eventId);
  return { message: "Event deleted successfully." };
};
