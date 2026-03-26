/**
 * Application Constants
 */

// Mood Labels and Scores
export const MOOD_LABELS = {
  VERY_NEGATIVE: "very_negative",
  NEGATIVE: "negative",
  NEUTRAL: "neutral",
  POSITIVE: "positive",
  VERY_POSITIVE: "very_positive",
};

export const MOOD_COLORS = {
  very_negative: "#ef4444",
  negative: "#f97316",
  neutral: "#eab308",
  positive: "#84cc16",
  very_positive: "#22c55e",
};

export const MOOD_EMOJIS = {
  very_negative: "😢",
  negative: "😕",
  neutral: "😐",
  positive: "🙂",
  very_positive: "😄",
};

// Time Ranges
export const TIME_RANGES = {
  WEEK: "7d",
  MONTH: "30d",
  QUARTER: "90d",
};

export const TIME_RANGE_LABELS = {
  "7d": "Last 7 Days",
  "30d": "Last 30 Days",
  "90d": "Last 90 Days",
};

// Alert Types
export const ALERT_TYPES = {
  CRITICAL: "critical",
  WARNING: "warning",
  INFO: "info",
};

export const ALERT_COLORS = {
  critical: "#ef4444",
  warning: "#f97316",
  info: "#3b82f6",
};

// API Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
  RATE_LIMITED: 429,
  SERVER_ERROR: 500,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "Unauthorized. Please log in again.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  RATE_LIMITED: "Too many requests. Please try again later.",
};

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

// Audio Configuration
export const AUDIO_CONFIG = {
  MIME_TYPE: "audio/webm",
  SAMPLE_RATE: 16000,
  CHANNELS: 1,
  BIT_DEPTH: 16,
};

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
};
