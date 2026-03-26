/**
 * useAlerts Hook - Alert management state
 */

import { useState, useCallback } from "react";
import { alertsService } from "../services";

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await alertsService.getAlerts();
      setAlerts(response);
      return response;
    } catch (err) {
      const message = err.data?.message || err.message || "Failed to fetch alerts";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const acknowledgeAlert = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await alertsService.acknowledgeAlert(id);
      setAlerts((prev) =>
        prev.map((alert) =>
          alert._id === id ? { ...alert, acknowledged: true } : alert
        )
      );
      return response;
    } catch (err) {
      const message = err.data?.message || err.message || "Failed to acknowledge alert";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    alerts,
    loading,
    error,
    getAlerts,
    acknowledgeAlert,
  };
};
