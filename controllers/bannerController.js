const banner = require('../models/bannerModel')


const bannerSchema = async (req, res) => {
    const { status } = req.body

    try {
        let banner_image
        if (req.files.length > 0 && req.files[0].location && req.files[0].location != undefined) {
            banner_image = req.files[0].location

        } else {
            banner_image = "No Image Found"

        }
        await banner.create({
            banner_image,
            status
        })
        return res.status(200).json({
            message: "banner Successfully Added with Image File Upload",
            banner_image: req.files[0].location || "No Image Found",
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
    try {
        let id = req.params.id
        const bannerExists = await banner.findById(id)

        if (!bannerExists) {
            res.json({ bannerExists: "Banner Not Exists" })
        } else {

            await banner.findByIdAndDelete(id).then(result => {
                if (result) {
                    res.json({
                        success: 1,
                        message: "Data Deleted",
                        // Id: result._id
                    })
                } else {
                    res.json({
                        success: 0,
                        message: "Fail Delete"
                    })
                }
            })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })

    }


}

const deleteAllBanner = async (req, res) => {
    banner.remove({}).then(result => {
        if (result) {
            res.json({
                success: 1,
                message: "Data Deleted",
                data: result
            })
        } else {
            res.json({
                success: 0,
                message: "Fail Delete"
            })
        }
    })
}

const enableBannerByName = async (req, res) => {
    let id = req.params.id
    const status = true
    const bannerExists = await banner.findOne({ id })

    if (!bannerExists) {
        return res.status(400).json({ message: "banner Not Exists" })
    } else {
        banner.findOneAndUpdate({ id }, { status }).then(result => {
            if (result) {
                res.json({
                    success: 1,
                    message: "Data Updated",
                    data: {
                        banner_image: result.banner_image,
                        status: true
                    }
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
    let id = req.params.id
    const status = false
    const bannerExists = await banner.findOne({ id })

    if (!bannerExists) {
        return res.status(400).json({ message: "banner Not Exists" })
    } else {
        banner.findOneAndUpdate({ id }, { status }).then(result => {
            if (result) {
                res.json({
                    success: 1,
                    message: "Data Updated",
                    data: {
                        banner_image: result.banner_image,
                        status: false
                    }
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
    try {
        let id = req.params.id
        const { status } = req.body
        const bannerExists = await banner.findOne({ id })

        if (!bannerExists) {
            return res.status(400).json({ message: "Banner Not Exists" })
        } else {
            let banner_image
            if (req.files.length > 0 && req.files[0].location && req.files[0].location != undefined) {
                banner_image = req.files[0].location
            } else {
                banner_image = "No Image Found"
            }
            banner.findOneAndUpdate({ id }, { banner_image, status }).then(result => {
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
    } catch (error) {
        return res.json({ message: "Please Check your Input Field", error: error })
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
    disableAllBanner,
    deleteAllBanner
}