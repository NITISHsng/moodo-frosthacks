/**
 * Alerts Service - Alert management API endpoints
 */

import { apiClient } from "./client.js";

export const alertsService = {
  /**
   * Get all alerts
   * @returns {Promise<Array>}
   */
  getAlerts: () => apiClient.get("/mood/alerts"),

  /**
   * Acknowledge an alert
   * @param {string} id - Alert ID
   * @returns {Promise<{alert}>}
   */
  acknowledgeAlert: (id) =>
    apiClient.put(`/mood/alerts/${id}/acknowledge`, {}),
};
