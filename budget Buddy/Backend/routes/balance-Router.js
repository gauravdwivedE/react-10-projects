const express = require('express')
const router = express.Router()
const { getBalance } = require('../controllers/balance-Controller')

router.get("/:id",getBalance)

module.exports = router