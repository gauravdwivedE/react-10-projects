const express = require('express')
const cors  =  require ('cors');
const app = express()
require('dotenv').config()
const DBConnection = require('./configs/mongoose-connection')
const contactRouter = require('./routes/contact-Route')

DBConnection()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/contact",contactRouter)

app.listen(3000,()=>{
    console.log("App : server running on PORT 3000")
})