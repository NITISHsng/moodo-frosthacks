import Alert from "../models/Alert.js";
import { round } from "../utils/math.js";

const MOOD_THRESHOLD = 4; // Alert if average mood < 4
const DECLINE_THRESHOLD = 2; // Alert if decline > 2 points over 5 entries
const VOLATILITY_THRESHOLD = 3; // Alert if variance > 3

const RESOURCES = {
  declining_trend: [
    "https://www.mindful.org/meditation/mindfulness-getting-started/",
    "https://www.headspace.com/",
    "https://www.calm.com/",
  ],
  low_mood: [
    "https://www.samhsa.gov/find-help/national-helpline",
    "https://suicidepreventionlifeline.org/",
    "https://www.betterhelp.com/",
  ],
  high_volatility: [
    "https://www.psychologytoday.com/us/basics/stress",
    "https://www.mindful.org/",
  ],
};

/**
 * Check if alert should be triggered
 * @param {array} entries - Recent mood entries
 * @returns {object} { shouldAlert, type, message, severity }
 */
export const checkAlertConditions = (entries) => {
  if (!entries || entries.length < 5) {
    return { shouldAlert: false };
  }

  // Get scores in chronological order
  const scores = entries
    .slice(0, 10)
    .reverse()
    .map((e) => e.moodScore);

  const recent = scores.slice(-5);
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;

  // Check 1: Low mood average
  if (recentAvg < MOOD_THRESHOLD) {
    return {
      shouldAlert: true,
      type: "low_mood",
      message: `Your average mood (${round(recentAvg, 1)}) is below the healthy threshold. Consider reaching out for support.`,
      severity: recentAvg < 2 ? "high" : "medium",
    };
  }

  // Check 2: Declining trend
  if (scores.length >= 5) {
    const previous = scores.slice(0, 5);
    const previousAvg = previous.reduce((a, b) => a + b, 0) / previous.length;
    const decline = previousAvg - recentAvg;

    if (decline > DECLINE_THRESHOLD) {
      return {
        shouldAlert: true,
        type: "declining_trend",
        message: `Your mood has declined by ${round(decline, 1)} points over the last few entries. Take time to care for yourself.`,
        severity: decline > 4 ? "high" : "medium",
      };
    }
  }

  // Check 3: High volatility
  const variance =
    scores.reduce((sum, score) => {
      const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
      return sum + Math.pow(score - mean, 2);
    }, 0) / scores.length;

  if (variance > VOLATILITY_THRESHOLD) {
    return {
      shouldAlert: true,
      type: "high_volatility",
      message: `Your mood is fluctuating significantly. Try to identify triggers and maintain consistent routines.`,
      severity: "medium",
    };
  }

  return { shouldAlert: false };
};

/**
 * Create alert if conditions met
 */
export const createAlertIfNeeded = async (userId, entries) => {
  const check = checkAlertConditions(entries);

  if (!check.shouldAlert) {
    return null;
  }

  // Check if similar alert already exists (within last 24 hours)
  const existingAlert = await Alert.findOne({
    user: userId,
    type: check.type,
    createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    acknowledged: false,
  });

  if (existingAlert) {
    return existingAlert;
  }

  // Create new alert
  const alert = await Alert.create({
    user: userId,
    type: check.type,
    message: check.message,
    severity: check.severity,
    resources: RESOURCES[check.type] || [],
    triggerData: {
      recentScores: entries.slice(0, 5).map((e) => e.moodScore),
      timestamp: new Date(),
    },
  });

  return alert;
};

/**
 * Get active alerts for user
 */
export const getActiveAlerts = async (userId) => {
  const alerts = await Alert.find({
    user: userId,
    acknowledged: false,
  })
    .sort({ createdAt: -1 })
    .limit(10);

  return alerts;
};

/**
 * Acknowledge alert
 */
export const acknowledgeAlert = async (alertId) => {
  const alert = await Alert.findByIdAndUpdate(
    alertId,
    {
      acknowledged: true,
      acknowledgedAt: new Date(),
    },
    { new: true }
  );

  return alert;
};

/**
 * Get alert history
 */
export const getAlertHistory = async (userId, limit = 20) => {
  const alerts = await Alert.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit);

  return alerts;
};
