import { analyzeSentiment } from "../services/sentiment.service.js";

/**
 * POST /sentiment/analyze
 * Analyze sentiment from text
 */
export const analyzeSentimentText = async (req, res, next) => {
  try {
    const { text } = req.body;

    const result = analyzeSentiment(text);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
