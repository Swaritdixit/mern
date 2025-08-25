import express from"express";
const Router = express.Router();
console.log("📌 NotesRoutes is loaded");

// Then after all routes are defined
console.log("Routes registered in notesRoutes:", Router.stack.map(r => r.route?.path || r.name));

import{getAllNotes,createNote,updateNote,deleteNote} from "../controllers/nodesController.js"
const router =express.Router();

router.get("/",getAllNotes);


router.post("/",createNote);
router.put("/:id",updateNote);
   
router.delete("/:id",deleteNote);
  
export default router;

