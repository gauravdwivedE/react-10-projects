const {validateEarning,earningModel} = require('../models/earning-Model')

module.exports. createEarning = async(req,res)=>{
    const {id} = req.params
    const {earning} = req.body
    try{
        const error = validateEarning({earning,user:id})
        if(error) return res.status(400).send(error)
        const createdEarning = await earningModel.create({earning,user:id})
        res.status(201).send(createdEarning)
    }
    catch(err){
        res.status(500).send(err)
    }
}

module.exports. getEarnings = async(req,res)=>{   
    const {id} = req.params
    try{
      const error = validateEarning({earning:500,user:id})
      if(error) return res.status(400).send(error)
      const earnings = await earningModel.find({user:id}).lean()
  
      let totalEarnings = 0
      earnings.forEach((item)=>{
        totalEarnings += item.earning  
      })
    
      res.send({totalEarnings:totalEarnings})
      
    }catch(err){
        res.send(err)
    }
}