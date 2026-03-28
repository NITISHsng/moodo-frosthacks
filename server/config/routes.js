import authRoutes from "../routes/authRoutes.js";
import moodRoutes from "../routes/moodRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";

export const configureRoutes = (app) => {
  // API routes
  app.use("/api/auth", authRoutes);
  app.use("/api/mood", moodRoutes);
  app.use("/api/admin", adminRoutes);

  // Health check
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ 
      success: true, 
      message: "Server is running",
      timestamp: new Date().toISOString()
    });
  });

  // Warmup endpoint to prevent cold starts
  app.get("/api/warmup", async (_req, res) => {
    try {
      // Initialize database connection check
      const mongoose = await import("mongoose");
      const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
      
      res.status(200).json({ 
        success: true, 
        status: "warmed",
        message: "Backend service ready",
        database: dbStatus,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        status: "error",
        message: error.message 
      });
    }
  });
};
