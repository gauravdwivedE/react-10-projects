const express = require('express')
const router = express.Router()
const {createUser,getUser,loginUser} = require('../controllers/user-Controller')

router.post("/signup",createUser)
router.get("/:id",getUser)
router.post("/login",loginUser)

module.exports = router