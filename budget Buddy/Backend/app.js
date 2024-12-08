const express = require('express')
const app = express()
const getDBConnection = require('./configs/mongoose-config')
require('dotenv').config()
const cors = require('cors')
const userRouter = require('./routes/user-Router')
const expensesRouter = require('./routes/expense-Router')
const categoryRouter = require('./routes/category-Router')
const earningRouter = require('./routes/earning-Router')
const balanceRouter = require('./routes/balance-Router')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
getDBConnection()

app.use("/users",userRouter)
app.use("/expenses",expensesRouter)
app.use("/categories",categoryRouter)
app.use("/earnings",earningRouter)
app.use("/balances",balanceRouter)
app.listen(3000)