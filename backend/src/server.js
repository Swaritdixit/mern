import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express(); // <<< initialize app first
const PORT = process.env.PORT || 5001;
const _dirname = path.resolve();

console.log("✅ Backend starting...");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT from env:", process.env.PORT);

// Log incoming requests
app.use((req, res, next) => {
  console.log("🔹 Incoming request:", req.method, req.url);
  next();
});

// CORS
if (process.env.NODE_ENV !== "production") {
  console.log("Applying CORS for localhost:5173");
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// Middlewares
app.use(express.json());
app.use(rateLimiter);

// Routes
console.log("Registering /api/notes route");
app.use("/api/notes", notesRoutes);

// Static frontend
const frontendPath = path.join(_dirname, "../frontend/dist");
console.log("Serving static files from:", frontendPath);
app.use(express.static(frontendPath));

if (process.env.NODE_ENV === "production") {
  console.log("Setting up catch-all for non-API routes");
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(frontendPath, "index.html"));
    } else {
      res.status(404).send("API route not found");
    }
  });
}

// Connect DB and start server
connectDB().then(() => {
  console.log("MongoDB connected successfully");
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
