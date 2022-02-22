const dotenv = require('dotenv').config()
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {
    const { name, email, password, conform_password, phone_no, tc } = req.body

    if (tc == false) {
        return res.status(400).json({ message: "Make sure T&C is Accept" })

    }
    if (!name || !email || !password || !conform_password || !phone_no || !tc) {
        return res.status(400).json({ message: "Please Insert All Fields" })

    }
    if (password !== conform_password) {
        return res.status(400).json({ message: "Please insert Password and ConformPassword Same" })

    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const hashedConformPassword = await bcrypt.hash(conform_password, salt)

    const userExists = await userModel.findOne({ email: req.body.email })

    if (userExists) {
        return res.status(400).json({ message: "User Alredy Exists" })
    } else {
        await userModel.create({
            name,
            email,
            password: hashedPassword,
            conform_password: hashedConformPassword,
            phone_no,
            tc
        })
        return res.status(200).json({
            message: "User Successfully Registered",
            name,
            email,
            phone_no
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
module.exports = { registerUser, login }