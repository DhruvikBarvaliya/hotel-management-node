const express = require('express')
const router = express.Router()
const { addRoom } = require('../controllers/roomController')

router.post('/addRoom', addRoom)

module.exports = router