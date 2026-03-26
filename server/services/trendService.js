const TREND_THRESHOLD = 5;
const ALERT_SCORE_THRESHOLD = 50;

const avg = (entries) =>
  entries.reduce((sum, e) => sum + e.moodScore, 0) / entries.length;

export const analyzeTrend = (moodEntries) => {
  if (!moodEntries || moodEntries.length < 5) {
    return { trend: "insufficient_data", alert: false, message: "" };
  }

  const entries = moodEntries.slice(0, 10);
  const recent = entries.slice(0, 5);
  const previous = entries.slice(5);

  const recentAvg = avg(recent);
  const previousAvg = previous.length ? avg(previous) : recentAvg;
  const overallAvg = avg(entries);

  let trend;
  if (recentAvg < previousAvg - TREND_THRESHOLD) trend = "declining";
  else if (recentAvg > previousAvg + TREND_THRESHOLD) trend = "improving";
  else trend = "stable";

  const alert = trend === "declining" && recentAvg < ALERT_SCORE_THRESHOLD;
  const message = alert
    ? "You seem stressed. Consider taking a break or talking to someone."
    : "";

  return {
    trend,
    recentAvg: +recentAvg.toFixed(2),
    previousAvg: +previousAvg.toFixed(2),
    average: +overallAvg.toFixed(2),
    alert,
    message,
  };
};
