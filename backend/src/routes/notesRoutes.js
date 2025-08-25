import express from"express";
import{getAllNotes,getNoteById,createNote,updateNote,deleteNote} from "../controllers/nodesController.js"
const router =express.Router();

router.get("/",getAllNotes);
router.get("/:id",getAllNotes);

router.post("/",createNote);
router.put("/:id",updateNote);
   
router.delete("/:id",deleteNote);
  
export default router;

