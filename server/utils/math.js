/**
 * Normalize a value to a range [0, 1]
 */
export const normalize = (value, min, max) => {
  if (max === min) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
};

/**
 * Calculate moving average over last N values
 */
export const movingAverage = (values, windowSize = 5) => {
  if (values.length === 0) return 0;
  const window = values.slice(-windowSize);
  return window.reduce((sum, val) => sum + val, 0) / window.length;
};

/**
 * Calculate variance of values
 */
export const variance = (values) => {
  if (values.length === 0) return 0;
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
  return squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
};

/**
 * Calculate standard deviation
 */
export const stdDeviation = (values) => {
  return Math.sqrt(variance(values));
};

/**
 * Round to N decimal places
 */
export const round = (value, decimals = 2) => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
