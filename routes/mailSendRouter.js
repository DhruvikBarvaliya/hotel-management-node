const express = require('express')
const router = express.Router()
const mailSend = require('../controllers/mailSendController')

router.post('/mailSend', mailSend)

module.exports = router