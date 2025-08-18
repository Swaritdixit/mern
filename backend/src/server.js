import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"; 
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 5001;
dotenv.config();
app.use("/api/notes",notesRoutes);
connectDB();
app.listen(PORT, () => {
  console.log("server started on PORT:", PORT);
});
