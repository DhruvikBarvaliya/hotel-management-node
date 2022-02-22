const express = require('express')
const router = express.Router()
const { catagarySchema } = require('../controllers/catagaryController')

router.post('/addCatagary', catagarySchema)

module.exports = router