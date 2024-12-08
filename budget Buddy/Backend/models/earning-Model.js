const mongoose = require('mongoose');
const Joi = require('joi');

const earningSchema = new mongoose.Schema({

    earning: {type: Number,required: true},
    createdAt: {type: Date,default: Date.now},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    isActive: {type: Boolean,default: true,}

})

const earningModel = mongoose.model('Earning', earningSchema);

const validateEarning = (data) => {
    const schema = Joi.object({
        earning: Joi.number().min(1).required(),
        isActive: Joi.boolean().default(()=>true),
        user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
            "string.pattern.base": "Invalid user ID. It must be a valid 24-character hex string.",  
        })
    })
    const {error} =  schema.validate(data);

    return error?.message
};


module.exports = { earningModel,validateEarning };
