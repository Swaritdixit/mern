import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const _dirname = path.resolve();

console.log("✅ Backend starting...");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT from env:", process.env.PORT);

// Top-level request logger
app.use((req, res, next) => {
  console.log("🔹 Incoming request:", req.method, req.url);
  next();
});

// CORS only for dev
if (process.env.NODE_ENV !== "production") {
  console.log("Applying CORS for localhost:5173");
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// JSON parser and rate limiter
console.log("Applying JSON parser and rate limiter");
app.use(express.json());
app.use(rateLimiter);

// Register routes
console.log("Registering /api/notes route");
app.use("/api/notes", notesRoutes);

// Frontend static files
const frontendPath = path.join(_dirname, "../frontend/dist");
console.log("Serving static files from:", frontendPath);

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
} else {
  console.warn("⚠️ Frontend path does not exist:", frontendPath);
}

// Catch-all route for production
if (process.env.NODE_ENV === "production") {
  console.log("Setting up catch-all for non-API routes");
  app.get("*", (req, res, next) => {
    try {
      if (!req.path.startsWith("/api")) {
        return res.sendFile(path.join(frontendPath, "index.html"));
      } else {
        return res.status(404).send("API route not found");
      }
    } catch (err) {
      console.error("Error in catch-all:", err);
      next(err);
    }
  });
}

// Connect DB and start server
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log("Server started on PORT:", PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
