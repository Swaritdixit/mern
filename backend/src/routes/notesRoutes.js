import express from "express";
import { getAllNotes, createNote, updateNote, deleteNote } from "../controllers/nodesController.js";

const router = express.Router();
console.log("📌 NotesRoutes is loaded");

// Define routes
router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

// Log the registered routes
console.log("Routes registered in notesRoutes:", router.stack.map(r => r.route?.path || r.name));

export default router;
