const Joi = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Please enter a valid email']
    },
    password:{type:String,required:true},
    createdAt:{type:Date,required:true,default:new Date()},
    updatedAt:{type:Date},
    isActive:{type:Boolean,required:true,default:true},
    expenses:[{type:mongoose.Schema.Types.ObjectId, ref:'Expense'}]

})

const validateUser = (data)=>{
    const schema = Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/).message({'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long'}),
        createdAt:Joi.date().required().default(()=>new Date()),
        updatedAt:Joi.date(),
        isActive:Joi.boolean().required().default(()=>true),
        expenses: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
            "string.pattern.base": "Invalid user ID. It must be a valid 24-character hex string.",  
        })
    })
    const {error} = schema.validate(data)
    return error?.message
}

const userModel = mongoose.model("User",userSchema)

module.exports = {validateUser,userModel}