import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

console.log("✅ Backend starting...");

dotenv.config();
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT from env:", process.env.PORT);

const app = express();
const PORT = process.env.PORT || 5001;
const _dirname = path.resolve();

// Log for any CORS setup
if (process.env.NODE_ENV !== "production") {
  console.log("Applying CORS for localhost:5173");
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// Log before middlewares
console.log("Applying JSON parser and rate limiter");
app.use(express.json());
app.use(rateLimiter);

// Log incoming requests
app.use((req, res, next) => {
  console.log(`📡 Incoming request: ${req.method} ${req.url}`);
  next();
});

// Log before registering routes
console.log("Registering /api/notes route with notesRoutes");
app.use("/api/notes", notesRoutes);

// Log static folder setup
const frontendPath = path.join(_dirname, "../frontend/dist");
console.log("Serving static files from:", frontendPath);
app.use(express.static(frontendPath));

// Catch-all for production
if (process.env.NODE_ENV === "production") {
  console.log("Setting up catch-all route for production");
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Connect to DB and start server
connectDB().then(() => {
  console.log("MongoDB connected successfully");
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
