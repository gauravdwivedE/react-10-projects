import  mongoose  from 'mongoose';
import  Joi  from 'joi';

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true,match:[/^\S+@\S+\.\S+$/, 'Please use a valid email address.']},
    password:{type:String,required:true,match:[/^(?=.*[@$!%*?&]).{8,}$/,'Password must be at least 8 characters and include a special symbol']}
})

function validateUser(data){
    const schema = Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(/^(?=.*[@$!%*?&]).{8,}$/).message("Password must be at least 8 characters and include a special symbol").required()
    })
    const {error} = schema.validate(data)
    return error?.message
}

const userModel = mongoose.model("User",userSchema)

export {userModel,validateUser}