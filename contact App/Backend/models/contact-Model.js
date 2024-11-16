const Joi = require('joi')
const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    number:{type:String,required:true,min:10,max:10}
})

function contactValidate(data){
    const schema = Joi.object({
        name:Joi.string().required(),
        number:Joi.string().required().min(10).max(10)
    })

    const {error} = schema.validate(data)
    return error?.message
}

const contactModel = mongoose.model("Contact",contactSchema)

module.exports = {contactModel,contactValidate}