/**
 * Sentiment Service - Sentiment analysis API endpoints
 */

import { apiClient } from "./client.js";

export const sentimentService = {
  /**
   * Analyze sentiment from text
   * @param {string} text - Text to analyze
   * @returns {Promise<{sentimentScore, label, confidence}>}
   */
  analyze: (text) =>
    apiClient.post("/mood/sentiment/analyze", { text }),
};
