/**
 * API Layer - Re-export all services for cleaner imports
 * Usage: import { authService, moodService } from '@/api'
 */

export { apiClient } from '../services/client';
export { authService } from '../services/auth.service';
export { moodService } from '../services/mood.service';
export { sentimentService } from '../services/sentiment.service';
export { alertsService } from '../services/alerts.service';
export { healthService } from '../services/health.service';
