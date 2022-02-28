const express = require('express')
const router = express.Router()
const { bannerSchema, getAllBanner,deleteBannerByImage,enableBannerByName,
    updateBannerByName,disableBannerByName ,enableAllBanner,
    disableAllBanner} = require('../controllers/bannerController')

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/banner");
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now() + "." + extension);
    }
});
const upload = multer({ storage: storage });

router.post('/addBanner', upload.single('file'), bannerSchema)
router.get('/getAllBanner', getAllBanner)
router.delete('/deleteBannerByImage/:banner_image', deleteBannerByImage)

router.put('/updateBannerByName/:banner_image', upload.single('file'), updateBannerByName)

router.patch('/enableBanner/:banner_image', enableBannerByName)
router.patch('/disableBanner/:banner_image', disableBannerByName)
router.patch('/enableAllBanner', enableAllBanner)
router.patch('/disableAllBanner', disableAllBanner)
module.exports = router