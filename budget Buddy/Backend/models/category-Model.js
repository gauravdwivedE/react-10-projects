const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({

    category: {type: String,required: true,minlength: 3,maxlength: 50,trim: true,},
    createdAt: {type: Date,default: Date.now},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    isActive: {type: Boolean,default: true,}

})

const categoryModel = mongoose.model('Category', categorySchema);

const validateCategory = (data) => {
    const schema = Joi.object({
        category: Joi.string().min(3).max(50).required(),
        isActive: Joi.boolean().default(()=>true),
        user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
            "string.pattern.base": "Invalid user ID. It must be a valid 24-character hex string.",  
        })
    })
    const {error} =  schema.validate(data);

    return error?.message
};


module.exports = { categoryModel,validateCategory };
