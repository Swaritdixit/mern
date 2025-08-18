import Note from '../models/Note.js';
export async function getAllNotes(req,res){
  try{
    const notes=await Note.find( );
res.status(200).json(notes);
  }
  catch(error){
    console.error("Error in getAllNotes controller:",error);
res.status(500).json({message:"Internal server error"})
  }  
};
 export async function createNote(req,res){
    try{
        const{title,content}=req.body
        const newNote=new Note({title:title,content:content})
        await newNote.save();
        res.status(201).json({message:"Note created successfully!"})
    }
    catch(error){
        console.error("Error in createNote controller:",error);
        res.status(500).json({message:"Internal server error"})

    }
};
 export async function createNote(req,res){
    try{
        const{title,content}=req.body
        const newNote=new Note({title:title,content:content})
        await newNote.save();
        res.status(201).json({message:"Note created successfully!"})
    }
    catch(error){
        console.error("Error in createNote controller:",error);
        res.status(500).json({message:"Internal server error"})

    }
};
export async function createNoteById(req,res){
    try{
             
         const Note=await Note.findById(req.params.id)
          if(!Note)
          {
            return res.status(404).json({message:"Note  not found!"})
          }
                res.status(200).json(Note);
        }
    catch(error){

 console.error("Error in updateNote controller:",error);
        res.status(500).json({message:"Internal server error"})

    }
};
export async function updateNote(req,res){
    try{
             const{title,content}=req.body
         const updateNode=await Note.findByIdAndUpdate(req.params.id,{title:title,content:content},{new:true})
          if(!updateNode)
          {
            return res.status(404).json({message:"Note  not found!"})
          }
                res.status(200).json({message:"Note updated successfully!"});
        }
    catch(error){

 console.error("Error in updateNote controller:",error);
        res.status(500).json({message:"Internal server error"})

    }
};
export async function deleteNote(req,res){
     try{
             const{title,content}=req.body
         const deleteNode=await Note.findByIdAndDelete(req.params.id,{title:title,content:content},{new:true})
          if(!deleteNode)
          {
            return res.status(404).json({message:"Note  not found!"})
          }
                res.status(200).json({message:"Note delete successfully!"});
        }
    catch(error){

 console.error("Error in deleteeNote controller:",error);
        res.status(500).json({message:"Internal server error"})

    }
}