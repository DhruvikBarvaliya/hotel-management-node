const express = require('express')
const router = express.Router()
const {
    registerUser,
    login,
    getAllUser,
    updateUserById,
    deleteAllUser,
    deleteUserById,
    enableUserByEmail,
    disableUserByEmail,
    enableAllUser,
    disableAllUser } = require('../controllers/userController')
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/UserImages");
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, req.body.email + '-' + file.fieldname + '-' + Date.now() + "." + extension);
    }
});
const upload = multer({ storage: storage });


router.post('/register', upload.single('file'), registerUser)
router.post('/login', login)
router.get('/', getAllUser)
router.put('/:email', upload.single('file'), updateUserById)
router.put('/enable/:email', enableUserByEmail)
router.put('/disable/:email', disableUserByEmail)
router.delete('/', deleteAllUser)
router.delete('/:email', deleteUserById)
router.patch('/enableAllUser', enableAllUser)
router.patch('/disableAllUser', disableAllUser)

module.exports = router