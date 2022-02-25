const express = require('express')
const router = express.Router()
const { upload } = require('../helper/fileHelper')
const { catagarySchema } = require('../controllers/catagaryController')

router.post('/addCatagary', upload.single('file'), catagarySchema)

module.exports = router