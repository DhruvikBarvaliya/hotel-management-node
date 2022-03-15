const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    //   const authHeader = req.headers['authorization']
    //   const token = authHeader && authHeader.split(' ')[1]
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.json({ message: "Token is Required" })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
}

module.exports = verifyToken 