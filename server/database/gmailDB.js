import mongoose from "mongoose";

const Connection = () => {
    const DB_URI=`mongodb+srv://neelmani242:Neelmani123@cluster0.cgzt6bb.mongodb.net/gmailDB?retryWrites=true&w=majority`;
    console.log('Database connected successfully');
    try{
        mongoose.connect(DB_URI);
    } catch(error){
        console.log('Error while connecting with the database',error.message);
    }
}

export default Connection;