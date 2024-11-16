const express = require('express')
const router = express.Router()
const {createContact,readContact,updateContact,deleteContact,readContactByID} = require('../controllers/contact-Controller')

router.post("/",createContact)

router.get("/",readContact)

router.get("/:id",readContactByID)

router.put("/:id",updateContact)

router.delete("/:id",deleteContact)

module.exports = router
