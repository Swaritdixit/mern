import express from"express";

const router =express.Router();

router.get("/",(req,res)=>{
    res.status(200).send("you just fetched the notes");
});
router.post("/",(req,res)=>{
    res.status(201).json({messages:"Note created Successsfully"});
});
router.put("/:id",(req,res)=>{
    res.status(200).json({message:"post updated successfully!"});
});
router.delete("/",(req,res)=>{
    res.status(200).json({message:"post deleted successfully!"});
});
export default router;

