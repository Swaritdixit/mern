import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"; 
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import fs from "fs";

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

const frontendPath = path.join(_dirname, "../frontend/dist");
console.log("Frontend path exists?", fs.existsSync(frontendPath));

app.use(express.static(frontendPath));
console.log("Static middleware registered");

// Only after this log, register catch-all
if (process.env.NODE_ENV === "production") {
  console.log("Setting up catch-all");
  app.get("*", (req, res) => {
    console.log("Catch-all hit"); // this will never log if route registration crashes
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
console.log("Catch-all route registered"); // if this never prints, the crash is before this




connectDB().then(() => {
app.listen(PORT, () => {
  console.log("server started on PORT:", PORT);
});
});
