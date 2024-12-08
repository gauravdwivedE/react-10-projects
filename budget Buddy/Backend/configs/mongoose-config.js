const mongoose = require('mongoose')

async function getDBConnect(){
  try{
     await mongoose.connect(process.env.MONGODB_URI)
     console.log("MongoDB Connection : Connected to Database")
     
 }  
 catch(err){
    console.log("MongoDB Connection : Error! ",err.message)  
 }
}

module.exports = getDBConnect
