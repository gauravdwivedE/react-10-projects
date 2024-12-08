const {validateCategory,categoryModel} = require('../models/category-Model')

module.exports. createCategory = async(req,res)=>{
    
    const category = req.body.category.toLowerCase()
    const {id} = req.params
    try{
    const  error  = validateCategory({category,user:id})
    if (error) return res.status(400).send(error)
  
    const getCategory = await categoryModel.findOne({category})
    if(getCategory) return res.status(409).send("Category already available")
  
  
    const createdCategory = await categoryModel.create({category,isActive:true,user:id})
    res.status(201).send(createdCategory)

  }catch(err){
    res.status(500).send(err)
  }
}

module.exports. getCategories = async(req,res)=>{   
    const {id} = req.params   
    try{
      console.log(id);
      
    const categories = await categoryModel.find({user:id})
    res.status(200).send(categories)
  }catch(err){
    res.status(500).send(err)
  }
}