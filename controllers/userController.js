const dotenv = require('dotenv').config()
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {
    const { name, email, password, phone, tc, status } = req.body

    if (tc == false) {
        return res.status(400).json({ message: "Make sure T&C is Accept" })

    }
    if (!name && !email && !password && !phone && !tc) {
        return res.status(400).json({ message: "Please Provide All Fields" })

    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userExists = await userModel.findOne({ email: req.body.email })

    if (userExists) {
        return res.status(400).json({ message: "User Alredy Exists" })
    } else {
        let user_img
        if (req.files.length > 0 && req.files[0].location && req.files[0].location != undefined) {
            user_img = req.files[0].location

        } else {
            user_img = "No Image Found"

        }
        await userModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            user_img,
            tc,
            status
        })
        return res.status(200).json({
            message: "User Successfully Registered",
            name,
            email,
            phone,
            status
        })
    }
}

const login = async (req, res) => {
    const { email, password, tc } = req.body
    if (tc == false) {
        return res.status(400).json({ message: "Make sure T&C is Accept" })

    }
    if (!email || !password || !tc) {
        return res.status(400).json({ message: "Please Insert All Fields" })

    }
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ message: "User not Found" })

    }
    if (user.status == false) {
        return res.status(400).json({ message: "User Is Disable, Please Contact Admin" })

    }
    // const pass = await bcrypt.compare(password, user.password)
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: "Please Insert Valid Password" })

    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    user.token = token
    res.status(200).json({
        _id: user.id,
        email,
        token
    })

}
/* const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
} */



const getAllUser = (req, res) => {
    userModel.find({}).then(result => {
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

const updateUserByEmail = async (req, res) => {
    const { name, email, password, phone, tc, status } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userExists = await userModel.findOne({ email: req.params.email })

    if (!userExists) {
        return res.status(400).json({ message: "User Not Exists" })
    } else {
        let user_img = req.files[0].location || "No Image Found"
        userModel.findOneAndUpdate({ email: req.params.email }, { name, hashedPassword, phone, status, user_img }).then(result => {
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

const enableUserByEmail = async (req, res) => {
    const status = true
    const userExists = await userModel.findOne({ email: req.params.email })

    if (!userExists) {
        return res.status(400).json({ message: "User Not Exists" })
    } else {
        userModel.updateOne({ status }).then(result => {
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

const disableUserByEmail = async (req, res) => {
    const status = false
    const userExists = await userModel.findOne({ email: req.params.email })

    if (!userExists) {
        return res.status(400).json({ message: "User Not Exists" })
    } else {
        userModel.updateOne({ status }).then(result => {
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


const enableAllUser = async (req, res) => {

    userModel.updateMany({},
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
const disableAllUser = async (req, res) => {
    userModel.updateMany({},
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
const deleteAllUser = async (req, res) => {
    userModel.remove({}).then(result => {
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
const deleteUserByEmail = async (req, res) => {
    userModel.findOneAndDelete({ email: req.params.email }).then(result => {
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
module.exports = {
    registerUser,
    login,
    getAllUser,
    updateUserByEmail,
    deleteAllUser,
    deleteUserByEmail,
    enableUserByEmail,
    disableUserByEmail,
    enableAllUser,
    disableAllUser
}