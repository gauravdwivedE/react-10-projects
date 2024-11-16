const {contactValidate,contactModel} = require('../models/contact-Model')

module.exports.createContact = async (req,res)=>{
    try{
        const {name,number} = req.body
        const validateResult = contactValidate({name,number})
        if(validateResult) return res.status(400).send(validateResult)
        let contact = await contactModel.findOne({name})
        if(contact) return res.status(409).send("Contact already saved by this name")
        contact = await contactModel.create({name,number})
        res.status(201).send(contact)
    }
    catch(err){
        res.status(500).send(err.message)
    }
} 

module.exports.readContact = async (req,res)=>{
    try{
        const contact  = await contactModel.find()
        res.status(200).send(contact)
    }
    catch(err){
        res.status(500).send(err.message)
    }
} 
module.exports.readContactByID = async (req,res)=>{
    try{
        const {id} = req.params
        const contact  = await contactModel.findById(id)
        if(!contact) return res.status(404).send("No contact found")
        res.status(200).send(contact)
    }
    catch(err){
        res.status(500).send(err.message)
    }
} 

module.exports.updateContact = async (req,res)=>{
 try{
    const {name,number} = req.body
    const {id} = req.params
    const validateResult  = contactValidate({name,number})
    if(validateResult) return res.status(400).send(validateResult)
    const contact = await contactModel.findByIdAndUpdate(id,{name,number},{new:true})
    if(!contact)return res.status(404).send("No user Found")
    res.status(200).send(contact)
 }   
 catch(err){
    res.status(500).send(err.message)
 }
} 

module.exports.deleteContact = async(req,res)=>{
    try{
     const {id} = req.params
     const contact = await contactModel.findByIdAndDelete(id)
     if(!contact) return res.status(404).send("NO contact found")
     res.status(200).send(contact)
    }
    catch(err){
        res.status(500).send(err.message)
    }
   
    
} 