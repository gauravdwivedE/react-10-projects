const jwt = require("jsonwebtoken");

 function tokenGen (payLoad){
    try{
     const token =  jwt.sign(payLoad,process.env.JWT_SECRET,{expiresIn:'7d'})
     console.log("JSON WEB Token : ",token)
     return token
    }
    catch(err){
        console.log("tokenGen : ",err.message);
    }
}

module.exports = tokenGen
