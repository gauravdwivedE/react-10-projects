const {validateEarning,earningModel} = require('../models/earning-Model')
const {expenseModel} = require('../models/expense-Model')

module.exports.getBalance = async(req,res)=>{
    const {id} = req.params
    try{
      const error = validateEarning({earning:500,user:id})
      if(error) return res.status(400).send(error)
      const earnings = await earningModel.find({user:id}).lean()
  
      let totalEarnings = 0
      earnings.forEach((item)=>{
        totalEarnings += item.earning  
      })
    
     const expenses = await expenseModel.find({user:id}).lean()
     if(expenses && expenses.length == 0) return res.status(404).send("Expenses not found")
     
     let totalAmountExpended = 0
     expenses.forEach(expense => {
        totalAmountExpended +=  expense.amount;        
     });

     const balance = totalEarnings-totalAmountExpended
     
     console.log("TotalAmountExpended : ", totalAmountExpended);
     console.log("TotalEarnings : ", totalEarnings);
     console.log("Balance : ", balance);
     
     res.status(200).send({balance:balance})
      
    }catch(err){
        res.send(err)
    }
    
}
