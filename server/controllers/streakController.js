import * as moodService from "../services/mood.service.js";

/**
 * GET /streak
 * Get user's current daily streak
 */
export const getUserStreak = async (req, res, next) => {
  try {
    const streak = await moodService.getUserStreak(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        streak,
      },
    });
  } catch (err) {
    next(err);
  }
};
