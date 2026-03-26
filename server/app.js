import express from "express";
import { configureMiddleware } from "./config/middleware.js";
import { configureRoutes } from "./config/routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Configure middleware
configureMiddleware(app);

// Configure routes
configureRoutes(app);

// Global error handler
app.use(errorHandler);

export default app;
