const express = require('express')
const router = express.Router()
const { upload, gupload } = require('../helper/fileHelper')
const { addRoom, getFile, getAllFile } = require('../controllers/roomController')

// router.post('/addRoom', upload.single('file'), gupload.single('files'), addRoom)
router.post('/addRoom', upload.single('file'), addRoom)
router.get('/getSingleRoomImg/:name', getFile);
// router.get('/getAllSingleRoomImg', getAllFile);

module.exports = router