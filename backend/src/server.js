import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"; 
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
app.use((req, res, next) => {
  console.log("🔹 Incoming request:", req.method, req.url);
  next();
});

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const _dirname=path.resolve()
if(process.env.NODE_ENV!=="production")
{app.use(
  cors({
    origin: "http://localhost:5173",
  }));}

app.use(express.json());
app.use(rateLimiter);

app.use((req,res,next)=>{
  console.log(`we just got a new request${req.url}`);
  next();
})
app.use("/api/notes",notesRoutes);
console.log("✅ Backend starting...");

app.use(express.static(path.join(_dirname,"../frontend/dist")))
if (process.env.NODE_ENV === "production") {
  console.log("Setting up catch-all for non-API routes");
  app.get("*", (req, res, next) => {
    try {
      // Ignore requests that are full URLs or invalid paths
      if (req.url.startsWith("http://") || req.url.startsWith("https://")) {
        console.warn("Ignoring invalid URL:", req.url);
        return res.status(400).send("Bad request");
      }

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




connectDB().then(() => {
app.listen(PORT, () => {
  console.log("server started on PORT:", PORT);
});
});
