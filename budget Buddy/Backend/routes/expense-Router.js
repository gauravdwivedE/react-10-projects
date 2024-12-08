const express = require('express')
const router = express.Router()
const {getExpensesByCategory, getExpenseById, getExpense, createExpense, updateExpense, deleteExpense, getLatestExpense} = require('../controllers/expense-Controller')

router.post("/:id", createExpense)
router.get("/:id", getExpense)
router.get("/latest/:id", getLatestExpense)
router.get("/:id/:expId", getExpenseById)
router.put("/:id", updateExpense)
router.delete("/:id/:expId", deleteExpense)
router.get("/categories/:category/:id", getExpensesByCategory)

module.exports = router