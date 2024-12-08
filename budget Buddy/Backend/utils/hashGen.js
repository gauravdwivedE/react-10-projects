const bcrypt = require('bcrypt')

 async function hashGen(password){
  try{        
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
  }
  catch(err){
    console.log("hashGen : ",err?.message) 
  }
}
module.exports = hashGen