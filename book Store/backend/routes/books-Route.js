import express from 'express'
const router = express.Router()
import getBooks from '../controllers/books-Controller.js'

router.get("/",getBooks)

export default router