const mongoose = require('mongoose')

async function DBConnecion(){
    try{
        mongoose.connect(process.env.MONGOOSE_CONNECTION)
        console.log("Mongoose-Connection : Connected to the database 😎");
    }
    catch(err){
        console.log("Mongoose-connection : ",err.message)
        process.env.exit(1)
    }
}
module.exports = DBConnecion