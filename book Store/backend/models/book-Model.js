import mongoose from "mongoose";
import  Joi  from 'joi';

const bookSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
    },
     price:{
        type:Number,
        required:true
    },
     category:{
        type:String,
        required:true
    },
     desc:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
})

function validateBook (data){
    const schema = Joi.object({
        name:Joi.string().required(),
        category:Joi.string().required(),
        price:Joi.number().required(),
        desc:Joi.string().required(),
        image:Joi.string().required()
    })

    const {error} = schema.validate(data)
    return error?.message
}

const bookModel = mongoose.model("Book",bookSchema)
export { validateBook, bookModel }