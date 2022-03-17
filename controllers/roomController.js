require("dotenv").config()
const room = require('../models/roomModel')
// const path = require('path')
// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");

// const s3 = new aws.S3({
//     accessKeyId: process.env.S3_ACCESS_KEY,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//     region: process.env.S3_BUCKET_REGION,
// });

// const upload = () =>
//     multer({
//         storage: multerS3({
//             s3,
//             bucket: process.env.S3_BUCKET_NAME,
//             metadata: function (req, file, cb) {
//                 cb(null, { fieldName: file.fieldname });
//             },
//             key: function (req, file, cb) {
//                 cb(null, `image-${Date.now()}.jpeg`);
//             },
//         }),
//     });

// uploadSingle(req, res, async (err) => {
//     if (err)
//         return res.status(400).json({ success: false, message: err.message });

//     await User.create({ photoUrl: req.file.location });

//     res.status(200).json({ data: req.file.location });
// });

const addRoom = async (req, res) => {
    const { name, description, rules, amenities, status } = req.body
    // const uploadSingle = upload()
    try {
        let room_image
        if (req.files.length > 0 && req.files[0].location && req.files[0].location != undefined) {
            room_image = req.files[0].location

        } else {
            room_image = "No Image Found"

        }
        const file = new room({
            name,
            description,
            rules,
            amenities,
            room_image,
            // gallery_image:req.files[0].location,
            status
        });

        await file.save();
        res.status(201).json({ message: 'Room Successfully added with Image File Upload' })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllRoom = (req, res) => {
    room.find({}).then(result => {
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


const enableAllRoom = async (req, res) => {

    room.updateMany({},
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
const disableAllRoom = async (req, res) => {
    room.updateMany({},
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
const deleteAllRoom = async (req, res) => {
    room.remove({}).then(result => {
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


const enableRoomById = async (req, res) => {
    const status = true
    const roomExists = await room.findById(req.params.id)

    if (!roomExists) {
        return res.status(400).json({ message: "Room Not Exists" })
    } else {
        await room.findByIdAndUpdate(req.params.id, { status }, { new: true }).then(result => {
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

const disableRoomById = async (req, res) => {
    const status = false
    const roomExists = await room.findById(req.params.id)

    if (!roomExists) {
        return res.status(400).json({ message: "Room Not Exists" })
    } else {
        await room.findByIdAndUpdate(req.params.id, { status }, { new: true }).then(result => {
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

const deleteRoomById = async (req, res) => {
    room.findOneAndDelete({ _id: req.params.id }).then(result => {
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

const updateRoomById = async (req, res) => {
    const { name, description, rules, amenities, status, gallery_image } = req.body
    const roomExists = await room.findById(req.params.id)

    if (!roomExists) {
        return res.status(400).json({ message: "Room Not Exists" })
    } else {
        let room_image
        if (req.files.length > 0 && req.files[0].location && req.files[0].location != undefined) {
            room_image = req.files[0].location

        } else {
            room_image = "No Image Found"

        }
        room.findByIdAndUpdate({ _id: req.params.id }, {
            name,
            description,
            rules,
            amenities,
            room_image,
            // gallery_image,
            status
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

}

module.exports = {
    addRoom,
    getAllRoom,
    enableAllRoom,
    disableAllRoom,
    deleteAllRoom,
    enableRoomById,
    disableRoomById,
    deleteRoomById,
    updateRoomById
}