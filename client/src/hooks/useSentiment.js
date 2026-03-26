/**
 * useSentiment Hook - Sentiment analysis state management
 */

import { useState, useCallback } from "react";
import { sentimentService } from "../services";

export const useSentiment = () => {
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (text) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sentimentService.analyze(text);
      setSentiment(response);
      return response;
    } catch (err) {
      const message = err.data?.message || err.message || "Failed to analyze sentiment";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sentiment,
    loading,
    error,
    analyze,
  };
};
