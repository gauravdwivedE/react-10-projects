const {validateExpense,expenseModel} = require('../models/expense-Model')
const { userModel } = require('../models/user-Model')

module.exports. createExpense = async(req,res)=>{
   
    try{
     const {title,desc,amount,budget,category,date} = req.body
     const error = validateExpense({title,desc,amount,budget,category,date,user:req.params.id})
     if(error) return res.status(400).send(error)
     const createdAt = new Date()
     const isActive = true
     const expense = await expenseModel.create({title,desc,amount,budget,category,date,createdAt,isActive,user:req.params.id})
     const user = await userModel.findById(req.params.id)
     user.expenses.push(expense._id)
     await user.save()
     res.status(201).send(expense)
    }
    catch(err){
     res.status(500).send(err.message)
    }
}

module.exports.getExpense = async (req,res)=>{
    try{
     const expenses = await expenseModel.find({user:req.params.id}).lean().sort({createdAt: -1})
     if(expenses && expenses.length == 0) return res.status(404).send("Expenses not found")
     expenses.forEach(expense => {
        expense.balance = expense.budget - expense.amount;
     });
     res.status(200).send(expenses)
    }
    catch(err){
     res.status(500).send(err.message)
    }
}

module.exports.getLatestExpense = async (req,res)=>{    
    try{
     const expenses = await expenseModel.find({user:req.params.id}).lean().sort({ createdAt: -1 }).limit(10);
     if(expenses && expenses.length == 0) return res.status(404).send("Expenses not found")
     expenses.forEach(expense => {
        expense.balance = expense.budget - expense.amount;
     });
     res.status(200).send(expenses)
    }
    catch(err){
     res.status(500).send(err.message)
    }
}

module.exports.getExpenseById = async (req,res)=>{
    try{
     const expense = await expenseModel.findOne({user:req.params.id,_id:req.params.expId}).lean()
     if(expense && expense.length == 0) return res.status(404).send("Expenses not found")

        expense.balance = expense.budget - expense.amount;
  
     res.status(200).send(expense)
    }
    catch(err){
     res.status(500).send(err.message)
    }
}

module.exports.getExpensesByCategory =  async (req,res)=>{
    try{
     const category = req.params.category.toLowerCase();
     const expense = await expenseModel.find({category}).lean()
     if(expense && expense.length == 0) return res.status(404).send("Expenses not found")
        expense.balance = expense.budget - expense.amount;
        res.status(200).send(expense)
    }
    catch(err){
     res.status(500).send(err.message)
    }
}

module.exports.deleteExpense = async (req,res)=>{
    try{
    const {id,expId} = req.params
    const expense = await expenseModel.deleteOne({_id:expId,user:id}) 
    if(expense.deletedCount == 0)return res.status(404).send("expense not found")
    res.status(200).send(expense)
    }catch(err){
        res.status(500).send(err.message)
    }
}

module.exports.updateExpense = (req,res)=>{
    res.send("hula")
}

