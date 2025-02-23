import express from 'express'
import cors from 'cors';
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import DBConnect from './configs/mongoose-connection.js';
import booksRoute from './routes/books-Route.js'
import userRoute from './routes/user-Route.js'
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/books",booksRoute)
app.use("/auth",userRoute)

const port = process.env.PORT || 3000
app.listen(port,()=>{
    DBConnect()
    console.log("App : Server is running on port",port);
})