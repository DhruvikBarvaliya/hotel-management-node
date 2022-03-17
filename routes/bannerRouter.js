const express = require('express')
const router = express.Router()
const bannerController = require('../controllers/bannerController')
const auth = require("../middleware/auth")
const { upload } = require("../create-bucket")

router.post('/addBanner', auth, upload.array('banner_image', 1), bannerController.bannerSchema)
router.get('/getAllBanner', auth, bannerController.getAllBanner)
router.put('/updateBannerByName/:banner_image', auth, upload.array('banner_image', 1), bannerController.updateBannerByName)
router.patch('/enableAllBanner', auth, bannerController.enableAllBanner)
router.patch('/disableAllBanner', auth, bannerController.disableAllBanner)
router.patch('/enableBanner/:banner_image', auth, bannerController.enableBannerByName)
router.patch('/disableBanner/:banner_image', auth, bannerController.disableBannerByName)
router.delete('/deleteBannerByImage/:id', auth, bannerController.deleteBannerByImage)
router.delete('/deleteAllBanner', auth, bannerController.deleteAllBanner)

module.exports = router