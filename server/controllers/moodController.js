// Re-export from modular controllers for backward compatibility
export { analyzeMood } from "./moodAnalysisController.js";
export { processAudio } from "./audioProcessingController.js";
export { getMoodHistory, getLatestMood, getMoodTrend } from "./moodHistoryController.js";
export { getDashboard } from "./dashboardController.js";
export { analyzeSentimentText } from "./sentimentController.js";
export { getAlerts, acknowledgeAlert } from "./alertController.js";
export { getUserStreak } from "./streakController.js";
