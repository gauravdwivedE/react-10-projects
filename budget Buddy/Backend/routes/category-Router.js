const express = require('express')
const router = express.Router()
const { createCategory, getCategories } = require('../controllers/category-Controller')

router.post("/:id",createCategory)
router.get("/:id",getCategories)

module.exports = router