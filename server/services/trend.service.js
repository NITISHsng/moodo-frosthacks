import { movingAverage, variance, round } from "../utils/math.js";

const TREND_THRESHOLD = 0.5; // 50% difference threshold

/**
 * Analyze mood trend from entries
 * @param {array} entries - Mood entries sorted by date (newest first)
 * @returns {object} { trend, fluctuation, confidence }
 */
export const analyzeTrend = (entries) => {
  if (!entries || entries.length < 5) {
    return {
      trend: "insufficient_data",
      fluctuation: "unknown",
      confidence: 0,
    };
  }

  // Get scores in chronological order (oldest to newest)
  const scores = entries
    .slice(0, 10)
    .reverse()
    .map((e) => e.moodScore);

  // Split into recent (last 5) and previous (5 before that)
  const recent = scores.slice(-5);
  const previous = scores.slice(0, 5);

  // Calculate averages
  const recentAvg = movingAverage(recent, 5);
  const previousAvg = movingAverage(previous, 5);

  // Calculate trend
  const percentChange = (recentAvg - previousAvg) / previousAvg;
  let trend = "stable";

  if (percentChange > TREND_THRESHOLD) {
    trend = "upward";
  } else if (percentChange < -TREND_THRESHOLD) {
    trend = "downward";
  }

  // Calculate fluctuation
  const allVariance = variance(scores);
  let fluctuation = "low";
  if (allVariance > 2) fluctuation = "high";
  else if (allVariance > 1) fluctuation = "moderate";

  // Confidence based on data consistency
  const confidence = Math.min(1, entries.length / 10);

  return {
    trend,
    fluctuation,
    confidence: round(confidence, 2),
    recentAverage: round(recentAvg, 2),
    previousAverage: round(previousAvg, 2),
    variance: round(allVariance, 2),
  };
};

/**
 * Get trend summary for dashboard
 */
export const getTrendSummary = (entries) => {
  const analysis = analyzeTrend(entries);

  let trendMessage = "";
  switch (analysis.trend) {
    case "upward":
      trendMessage = "Your mood is improving";
      break;
    case "downward":
      trendMessage = "Your mood is declining";
      break;
    case "stable":
      trendMessage = "Your mood is stable";
      break;
    default:
      trendMessage = "Not enough data to determine trend";
  }

  return {
    ...analysis,
    message: trendMessage,
  };
};
