/**
 * Helper Functions - Common utilities for the application
 */

import { MOOD_COLORS, MOOD_EMOJIS, VALIDATION, ERROR_MESSAGES } from "./constants.js";

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Format time to readable string
 */
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format date and time
 */
export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

/**
 * Get mood color by label
 */
export const getMoodColor = (moodLabel) => {
  return MOOD_COLORS[moodLabel] || "#6b7280";
};

/**
 * Get mood emoji by label
 */
export const getMoodEmoji = (moodLabel) => {
  return MOOD_EMOJIS[moodLabel] || "😐";
};

/**
 * Validate email
 */
export const validateEmail = (email) => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
  return password.length >= VALIDATION.PASSWORD_MIN_LENGTH;
};

/**
 * Validate name
 */
export const validateName = (name) => {
  return (
    name.length >= VALIDATION.NAME_MIN_LENGTH &&
    name.length <= VALIDATION.NAME_MAX_LENGTH
  );
};

/**
 * Get error message from API error
 */
export const getErrorMessage = (error) => {
  if (!error) return ERROR_MESSAGES.SERVER_ERROR;

  if (error.status === 401) return ERROR_MESSAGES.UNAUTHORIZED;
  if (error.status === 422) return ERROR_MESSAGES.VALIDATION_ERROR;
  if (error.status === 429) return ERROR_MESSAGES.RATE_LIMITED;
  if (error.status >= 500) return ERROR_MESSAGES.SERVER_ERROR;

  return error.data?.message || error.message || ERROR_MESSAGES.SERVER_ERROR;
};

/**
 * Calculate average mood score
 */
export const calculateAverageMood = (moodEntries) => {
  if (!moodEntries || moodEntries.length === 0) return 0;
  const sum = moodEntries.reduce((acc, entry) => acc + (entry.moodScore || 0), 0);
  return Math.round(sum / moodEntries.length);
};

/**
 * Format mood score to percentage
 */
export const formatMoodScore = (score) => {
  return Math.round(score * 100);
};

/**
 * Debounce function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Check if file is audio
 */
export const isAudioFile = (file) => {
  return file.type.startsWith("audio/");
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return formatDate(date);
};
