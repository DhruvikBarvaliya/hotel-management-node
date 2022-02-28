const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const roomRouter = require('./roomRouter')
const catagaryRouter = require('./catagaryRouter')
const mailSendRouter = require('./mailSendRouter')
const fileUploadRouter = require('./fileUploadRouter')
const bannerRouter = require('./bannerRouter')


router.get('/', (req, res) => {
    res.json({ message: "Inside Index Routes" })
})

router.use('/api',
    userRouter,
    roomRouter,
    catagaryRouter,
    mailSendRouter,
    fileUploadRouter,
    bannerRouter
)


module.exports = router