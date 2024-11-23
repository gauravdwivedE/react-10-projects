import { validateBook,bookModel } from "../models/book-Model.js"

const getBooks = async(req,res)=>{
    try{
    const data = await bookModel.find()
    res.status(200).send(data)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}
export default getBooks
