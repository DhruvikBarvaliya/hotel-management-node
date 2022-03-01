const room = require('../models/roomModel')
const path = require('path')

const addRoom = async (req, res) => {
    const { name, description, rules, amenities, status } = req.body

    try {
        const file = new room({
            name,
            description,
            rules,
            amenities,
            room_image: req.file.filename,
            status
        });

        await file.save();
        res.status(201).json({ message: 'Room Successfully added with Image File Upload' })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getFile = async (req, res) => {
    res.sendFile(path.resolve(`uploads/room/${req.params.name}`));
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
        await room.findByIdAndUpdate(req.params.id, { status }).then(result => {
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
        await room.findByIdAndUpdate(req.params.id, { status }).then(result => {
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
    const { name, description, rules, amenities, status } = req.body
    const roomExists = await room.findById(req.params.id)

    if (!roomExists) {
        return res.status(400).json({ message: "User Not Exists" })
    } else {
        room.findByIdAndUpdate({ _id: req.params.id }, {
            name, description,
            rules,
            amenities,
            room_image: req.file.filename,
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
    getFile,
    enableAllRoom,
    disableAllRoom,
    deleteAllRoom,
    enableRoomById,
    disableRoomById,
    deleteRoomById,
    updateRoomById
}