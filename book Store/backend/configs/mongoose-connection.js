import mongoose  from "mongoose";

async function DBConnect(){
    try{
        await mongoose.connect(process.env.mongoURI)
        console.log("Mongoose Connection : connected to database"); 
    }
    catch(e){
        console.log("Mongoose Connection Error : ",e.message);      
        process.exit(1)
    }
}

export default  DBConnect
