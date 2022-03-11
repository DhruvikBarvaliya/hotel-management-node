const express = require('express')
const router = express.Router()
const mailSend = require('../controllers/mailSendController')
const auth = require("../middleware/auth")

router.post('/mailSend', auth, mailSend)

module.exports = router