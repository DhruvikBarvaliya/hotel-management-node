const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const roomRouter = require('./roomRouter')
const catagaryRouter = require('./catagaryRouter')
const mailSendRouter = require('./mailSendRouter')
const fileUploadRouter = require('./fileUploadRouter')
const bannerRouter = require('./bannerRouter')

router.use('/user', userRouter)
router.use('/room', roomRouter)
router.use('/catagary', catagaryRouter)
router.use('/mail', mailSendRouter)
router.use('/file', fileUploadRouter)
router.use('/banner', bannerRouter)

module.exports = router