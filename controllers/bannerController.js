const banner = require('../models/bannerModel')


const bannerSchema = async (req, res) => {
    const { status } = req.body

    try {
        await banner.create({
            banner_image: req.file.filename,
            status
        })
        return res.status(200).json({
            message: "banner Successfully Added with Image File Upload",
            banner_image: req.file.filename,
            status
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const getAllBanner = (req, res) => {
    banner.find({}).then(result => {
        if (result) {
            res.json({
                success: 1,
                message: "Data Recived",
                data: result
            })
        } else {
            res.json({
                success: 0,
                message: "Fail Recived"
            })
        }
    })
}

const deleteBannerByImage = async (req, res) => {
    const bannerExists = await banner.findOne({ banner_image: req.params.banner_image })

    if (!bannerExists) {
        res.json({ bannerExists: "Banner Not Exists" })
    } else {

        await banner.findByIdAndDelete(bannerExists._id).then(result => {
            if (result) {
                res.json({
                    success: 1,
                    message: "Data Deleted",
                    Id: result._id
                })
            } else {
                res.json({
                    success: 0,
                    message: "Fail Delete"
                })
            }
        })
    }
}

const enableBannerByName = async (req, res) => {
    const status = true
    const bannerExists = await banner.findOne({ banner_image: req.params.banner_image })

    if (!bannerExists) {
        return res.status(400).json({ message: "banner Not Exists" })
    } else {
        banner.updateOne({ status }).then(result => {
            if (result) {
                res.json({
                    success: 1,
                    message: "Data Updated",
                    data: result
                })
            } else {
                res.json({
                    success: 0,
                    message: "Fail Update"
                })
            }
        })
    }
}

const disableBannerByName = async (req, res) => {
    const status = false
    const bannerExists = await banner.findOne({ name: req.params.name })

    if (!bannerExists) {
        return res.status(400).json({ message: "banner Not Exists" })
    } else {
        banner.updateOne({ status }).then(result => {
            if (result) {
                res.json({
                    success: 1,
                    message: "Data Updated",
                    data: result
                })
            } else {
                res.json({
                    success: 0,
                    message: "Fail Update"
                })
            }
        })
    }
}

const updateBannerByName = async (req, res) => {
    const { status } = req.body

    const bannerExists = await banner.findOne({ banner_image: req.params.banner_image })

    if (!bannerExists) {
        return res.status(400).json({ message: "Banner Not Exists" })
    } else {
        banner.updateOne({ banner_image: req.file.filename, status }).then(result => {
            if (result) {
                res.json({
                    success: 1,
                    message: "Data Updated",
                    data: result
                })
            } else {
                res.json({
                    success: 0,
                    message: "Fail Update"
                })
            }
        })
    }

}

const enableAllBanner = async (req, res) => {

    banner.updateMany({},
        {
            $set: { status: true }
        }).then(result => {
            if (result) {
                res.json({
                    success: 1,
                    message: "Data Updated",
                    data: result
                })
            } else {
                res.json({
                    success: 0,
                    message: "Fail Update"
                })
            }
        })
}
const disableAllBanner = async (req, res) => {
    banner.updateMany({},
        {
            $set: { status: false }
        }).then(result => {
            if (result) {
                res.json({
                    success: 1,
                    message: "Data Updated",
                    data: result
                })
            } else {
                res.json({
                    success: 0,
                    message: "Fail Update"
                })
            }
        })
}

module.exports = {
    bannerSchema,
    getAllBanner,
    deleteBannerByImage,
    enableBannerByName,
    disableBannerByName,
    updateBannerByName,
    enableAllBanner,
    disableAllBanner
}