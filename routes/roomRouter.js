const express = require('express')
const router = express.Router()
// const { upload, gupload } = require('../helper/fileHelper')
const { addRoom, getFile, getAllFile } = require('../controllers/roomController')

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/room");
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, req.body.name + '-' + file.fieldname + '-' + Date.now() + "." + extension);
    }
});
const upload = multer({ storage: storage });

// router.post('/addRoom', upload.single('file'), gupload.single('files'), addRoom)
router.post('/addRoom', upload.single('file'), addRoom)
router.get('/getSingleRoomImg/:name', getFile);
// router.get('/getAllSingleRoomImg', getAllFile);

module.exports = router