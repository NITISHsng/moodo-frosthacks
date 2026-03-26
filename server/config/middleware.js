import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { xss } from "express-xss-sanitizer";

export const configureMiddleware = (app) => {
  // Security middleware
  app.use(helmet());
  app.use(xss());
  
  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: { success: false, message: "Too many requests, please try again later." },
    })
  );

  // Body & cookie parsing
  app.use(express.json());
  app.use(cookieParser());
  
  // CORS
  app.use(cors({ 
    origin: process.env.CLIENT_URL || "*", 
    credentials: true 
  }));
};
