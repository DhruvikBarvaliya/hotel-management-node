const catagary = require('../models/catagaryModel')


const catagarySchema = async (req, res) => {
    const { catagary_name, status } = req.body
    if (!catagary_name) {
        return res.status(400).json({ message: "Please Insert Catagary Name" })
    }
    try {

        const catagaryExists = await catagary.findOne({ catagary_name: req.body.catagary_name })

        if (catagaryExists) {
            return res.status(400).json({ message: "Catagary Name Alredy Exists" })
        } else {
            await catagary.create({
                catagary_name,
                catagary_image: req.file.filename,
                status
            })
            return res.status(200).json({
                message: "Catagary Successfully Added with Image File Upload",
                catagary_name,
                catagary_image: req.file.filename,
                status
            })
        }


    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


const getAllCatagary = (req, res) => {
    catagary.find({}).then(result => {
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

const deleteCatagaryByName = async (req, res) => {
    catagary.findOneAndDelete({ name: req.params.name }).then(result => {
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

const enableUserByName = async (req, res) => {
    const status = true
    const catagaryExists = await catagary.findOne({ name: req.params.name })

    if (!catagaryExists) {
        return res.status(400).json({ message: "Catagary Not Exists" })
    } else {
        catagary.updateOne({ status }).then(result => {
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

const disableUserByName = async (req, res) => {
    const status = false
    const catagaryExists = await catagary.findOne({ name: req.params.name })

    if (!catagaryExists) {
        return res.status(400).json({ message: "Catagary Not Exists" })
    } else {
        catagary.updateOne({ status }).then(result => {
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

const updateCategorieByName = async (req, res) => {
    const { catagary_name, status } = req.body

    const catagaryExists = await catagary.findOne({ name: req.params.name })

    if (!catagaryExists) {
        return res.status(400).json({ message: "Categorie Not Exists" })
    } else {
        catagary.updateOne({ catagary_name, status }).then(result => {
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

module.exports = {
    catagarySchema,
    getAllCatagary,
    deleteCatagaryByName,
    enableUserByName,
    disableUserByName,
    updateCategorieByName
}