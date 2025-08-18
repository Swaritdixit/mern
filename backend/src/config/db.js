import mongoose from 'mongoose';
export const connectDB= async   () => {

    try {
         await  mongoose.connect("mongodb+srv://leafguardian:Swarit333%40@cluster0.qarhwvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB connected successfully");       
    }
    catch(error)
    {
          console.error("Error connecting to MongoDB:", error);
    }
    };