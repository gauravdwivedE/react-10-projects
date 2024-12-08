const {validateUser,userModel} = require('../models/user-Model')
const hashGen = require('../utils/hashGen')
const tokenGen = require('../utils/tokenGen')
const bcrypt = require('bcrypt')

module.exports.createUser = async (req,res)=>{
  try{
    let {name,email,password} = req.body
    const createdAt = new Date()
    const isActive = true
    const validateError = validateUser({name,email,password,createdAt,isActive})
    if(validateError) return res.status(400).send(validateError)
    
    let user = await userModel.findOne({email})
    if(user) return res.status(409).send("Account already exist please go and login")

    const hasedPassword =  await hashGen(password)
    user = await userModel.create({name,email,password:hasedPassword,createdAt,isActive})

    const payLoad = {
        id:user._id,
        name:user.name,
        email:user.email,
        createdAt:user.createdAt,
        isActive:user.isActive
    } 
    const token = tokenGen(payLoad)
    res.status(201).send({token,data:payLoad})

  }catch(err){
    res.status(500).send(err.message)
  }
}

module.exports.getUser = async (req,res)=>{
  try{
    const { id } = req.params
    console.log("Get User ID : ",id)
    const user =  await userModel.findById(id).select("-password")
    if(!user) return res.status(404).send("Account not found")
    res.send(user)
  }
  catch(err){
    res.status(500).send(err.message)
  }
}

module.exports.loginUser = async (req,res)=>{
  try{
    const { email,password } = req.body

    if(!email || !password) return res.status(404).send("Email and password is required")
    console.log("Login User email : ",email)

    const user =  await userModel.findOne({email})
    if(!user) return res.status(401).send("Invalid email or password")
    
    const isMatched = await bcrypt.compare(password,user.password)     
    if(!isMatched) {
      console.log("Login User : Invalid email or password")
      return res.status(401).send("Invalid email or password")
    }
    
    user.password = undefined // excluding the password 

    const token = tokenGen({user})
    res.status(200).send(token)
  }
  catch(err){
    res.status(500).send(err.message)
  }
}

