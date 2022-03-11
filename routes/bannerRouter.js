const express = require('express')
const router = express.Router()
const bannerController = require('../controllers/bannerController')
const auth = require("../middleware/auth")

router.post('/addBanner', auth, bannerController.bannerSchema)
router.get('/getAllBanner', auth, bannerController.getAllBanner)
router.put('/updateBannerByName/:banner_image', auth, bannerController.updateBannerByName)
router.patch('/enableAllBanner', auth, bannerController.enableAllBanner)
router.patch('/disableAllBanner', auth, bannerController.disableAllBanner)
router.patch('/enableBanner/:banner_image', auth, bannerController.enableBannerByName)
router.patch('/disableBanner/:banner_image', auth, bannerController.disableBannerByName)
router.delete('/deleteAllBanner', auth, bannerController.deleteAllBanner)
router.delete('/deleteBannerByImage/:banner_image', auth, bannerController.deleteBannerByImage)

module.exports = router