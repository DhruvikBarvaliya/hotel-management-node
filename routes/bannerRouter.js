const express = require('express')
const router = express.Router()
const bannerController = require('../controllers/bannerController')

router.post('/addBanner', bannerController.bannerSchema)
router.get('/getAllBanner', bannerController.getAllBanner)
router.put('/updateBannerByName/:banner_image', bannerController.updateBannerByName)
router.patch('/enableAllBanner', bannerController.enableAllBanner)
router.patch('/disableAllBanner', bannerController.disableAllBanner)
router.patch('/enableBanner/:banner_image', bannerController.enableBannerByName)
router.patch('/disableBanner/:banner_image', bannerController.disableBannerByName)
router.delete('/deleteAllBanner', bannerController.deleteAllBanner)
router.delete('/deleteBannerByImage/:banner_image', bannerController.deleteBannerByImage)

module.exports = router