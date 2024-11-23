import {validateUser,userModel} from '../models/user-Model.js'
import bcrypt from 'bcrypt'
import genToken from '../utils/genToken.js'

const signup = async (req,res)=>{
 try{
   let {name,email,password} = req.body
   const valError = validateUser({name,email,password})
   if(valError) return res.status(400).send(valError)

   let user = await userModel.findOne({email})
   if(user) return res.status(409).send("Accound already exist, please login")

   const salt = await bcrypt.genSalt()
   const hasedPassword = await bcrypt.hash(password,salt)

   user = await userModel.create({name,email,password:hasedPassword})

   const payLoad = {
    id:user._id,
    name:user.name,
    email:user.email
   }
   const token = genToken(payLoad)
   res.status(201).send({payLoad,accessToken:token})
}
 catch(err){
    res.status(500).send(err.message)
}
}

const login = async(req,res)=>{
    try{
    const { email,password } = req.body
    const valError = validateUser({name:"ga",email,password})
    if(valError) return res.status(409).send(valError)
    
    const user = await userModel.findOne({email})
    if(!user) return res.status(401).send("Invalid username or password")
    
    const isMatched = await bcrypt.compare(password,user.password)
    if(!isMatched) return res.status(401).send("Invalid username or password")

    const payLoad = {
     id:user._id,
     name:user.name,
     email:user.email
    }

    const token = genToken(payLoad)  
    res.status(200).send({data:payLoad,accessToken:token})
}
 catch(err){
    res.status(500).send(err.message)
 }
}

export {signup,login}