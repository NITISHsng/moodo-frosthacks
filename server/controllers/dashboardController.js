import * as moodService from "../services/mood.service.js";
import * as trendService from "../services/trend.service.js";
import * as alertService from "../services/alert.service.js";

/**
 * GET /dashboard
 * Get dashboard data
 */
export const getDashboard = async (req, res, next) => {
  try {
    const { range = "7d" } = req.query;
    const rangeInDays = parseInt(range) || 7;

    const stats = await moodService.getMoodStats(req.user._id, rangeInDays);
    const trend = trendService.getTrendSummary(stats.entries);
    const alerts = await alertService.getActiveAlerts(req.user._id);
    const streak = await moodService.getUserStreak(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        entries: stats.entries,
        averageMood: stats.averageMood,
        minMood: stats.minMood,
        maxMood: stats.maxMood,
        entryCount: stats.entryCount,
        trend: trend.trend,
        fluctuation: trend.fluctuation,
        trendMessage: trend.message,
        activeAlerts: alerts.length,
        alerts: alerts.slice(0, 3),
        streak: streak,
      },
    });
  } catch (err) {
    next(err);
  }
};
