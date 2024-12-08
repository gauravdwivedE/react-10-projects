const Joi = require('joi')
const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    amount:{type:Number,required:true,min:1},
    budget:{type:Number,required:true,min:1},
    category:{type:String,required:true},
    date:{type:Date,default:new Date(),required:true},
    createdAt:{type:Date,default:new Date()},
    isActive:{type:Boolean,default:true},
    updatedAt:{type:Date},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
})

function validateExpense (data){
    const schema = Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        amount: Joi.number().required().min(1),
        budget: Joi.number().required().min(1),
        category: Joi.string().required(),
        date: Joi.date().default(() => new Date()).required(),
        createdAt: Joi.date().default(() => new Date()),
        isActive: Joi.boolean().default(true),
        updatedAt: Joi.date(),
        user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
            "string.pattern.base": "Invalid user ID. It must be a valid 24-character hex string.",  
        })
    })
    const {error} = schema.validate(data)
    return error?.message
}

const expenseModel = mongoose.model('Expense', expenseSchema);

module.exports = {validateExpense,expenseModel}
