const express = require('express')
const router = express.Router()
const { upload } = require('../helper/fileHelper')
const { addRoom } = require('../controllers/roomController')

router.post('/addRoom',upload.single('file'), addRoom)

module.exports = router