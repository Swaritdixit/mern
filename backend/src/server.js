import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"; 
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

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
if(process.env.NODE_ENV==="production"){
app.get("*",(req,res)=>{
  res.sendFile(path.join(_dirname,"../frontend/dist/index.html"))
});}
connectDB().then(() => {
app.listen(PORT, () => {
  console.log("server started on PORT:", PORT);
});
});
