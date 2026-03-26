/**
 * Health Service - Server health check
 */

import { apiClient } from "./client.js";

export const healthService = {
  /**
   * Check server health status
   * @returns {Promise<{message}>}
   */
  checkHealth: () => apiClient.get("/health"),
};
