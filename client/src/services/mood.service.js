/**
 * Mood Service - Mood analysis API endpoints
 */

import { apiClient } from "./client.js";

export const moodService = {
  /**
   * Process audio file for mood analysis
   * @param {File} audioFile - Audio file to process
   * @param {string} [text] - Optional text for analysis
   * @returns {Promise<{moodScore, normalizedScore, moodLabel, confidence, insight, trend, fluctuation, alert}>}
   */
  processAudio: (audioFile, text) => {
    const formData = new FormData();
    formData.append("audio", audioFile);
    if (text) {
      formData.append("text", text);
    }
    return apiClient.postFormData("/mood/process-audio", formData);
  },

  /**
   * Analyze mood from audio features
   * @param {Object} features - Audio features {pitch, jitter, speech_rate}
   * @param {string} [text] - Optional text for analysis
   * @returns {Promise<{mood, alert}>}
   */
  analyzeMood: (features, text) =>
    apiClient.post("/mood/analyze", { features, text }),

  /**
   * Get mood history
   * @param {string} [range='7d'] - Time range (7d|30d|90d)
   * @param {number} [limit=20] - Number of entries (1-100)
   * @returns {Promise<Array>}
   */
  getHistory: (range = "7d", limit = 20) =>
    apiClient.get(`/mood/history?range=${range}&limit=${limit}`),

  /**
   * Get latest mood entry
   * @returns {Promise<{mood}>}
   */
  getLatest: () => apiClient.get("/mood/latest"),

  /**
   * Get mood trend
   * @returns {Promise<{trend, fluctuation, confidence, message}>}
   */
  getTrend: () => apiClient.get("/mood/trend"),

  /**
   * Get user's current daily streak
   * @returns {Promise<{streak}>}
   */
  getStreak: () => apiClient.get("/mood/streak"),

  /**
   * Get dashboard data
   * @param {string} [range='7d'] - Time range (7d|30d|90d)
   * @returns {Promise<{entries, averageMood, trend, fluctuation, alerts, streak}>}
   */
  getDashboard: (range = "7d") =>
    apiClient.get(`/mood/dashboard?range=${range}`),
};
