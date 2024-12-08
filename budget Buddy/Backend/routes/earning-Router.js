const express = require('express')
const router = express.Router()
const { createEarning, getEarnings } = require('../controllers/earning-Controller')

router.post("/:id",createEarning)
router.get("/:id",getEarnings)

module.exports = router