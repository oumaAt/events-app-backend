import { Event } from "../models/Event.js";
import { User } from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  try {
    const [countStats, topEventsByParticipants] = await Promise.all([
      Event.aggregate([
        {
          $facet: {
            eventsByLocation: [
              { $group: { _id: "$location", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
            ],
            eventsByStatus: [
              { $group: { _id: "$status", count: { $sum: 1 } } },
            ],
            eventsToday: [
              { $match: { date: { $gte: startOfDay, $lte: endOfDay } } },
              { $count: "count" },
            ],
            totalEvents: [{ $count: "count" }],
          },
        },
      ]),
      Event.aggregate([
        { $match: { nbParticipants: { $exists: true, $ne: null, $gt: 0 } } },
        { $sort: { nbParticipants: -1 } },
        { $limit: 5 },
        {
          $project: {
            _id: 1,
            title: 1,
            nbParticipants: 1,
          },
        },
      ]),
    ]);

    const stats = countStats[0];
    const eventsToday = stats.eventsToday[0]?.count || 0;
    const totalEvents = stats.totalEvents[0]?.count || 0;

    return res.status(200).json({
      totalEvents,
      eventsToday,
      eventsByLocation: stats.eventsByLocation,
      eventsByStatus: stats.eventsByStatus,
      topEventsByParticipants,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while calculating dashboard stats." });
  }
};
