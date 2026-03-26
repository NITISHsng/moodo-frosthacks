import * as moodService from "../services/mood.service.js";
import * as trendService from "../services/trend.service.js";

/**
 * GET /mood/history
 * Get mood history
 */
export const getMoodHistory = async (req, res, next) => {
  try {
    const { range = "7d", limit = 20 } = req.query;
    const rangeInDays = parseInt(range) || 7;

    const entries = await moodService.getMoodHistory(req.user._id, rangeInDays, limit);

    res.status(200).json({ success: true, data: entries });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /mood/latest
 * Get latest mood entry
 */
export const getLatestMood = async (req, res, next) => {
  try {
    const entry = await moodService.getLatestMood(req.user._id);

    res.status(200).json({ success: true, data: entry });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /mood/trend
 * Get mood trend analysis
 */
export const getMoodTrend = async (req, res, next) => {
  try {
    const entries = await moodService.getMoodHistory(req.user._id, 7, 10);
    const trend = trendService.getTrendSummary(entries);

    res.status(200).json({ success: true, data: trend });
  } catch (err) {
    next(err);
  }
};
