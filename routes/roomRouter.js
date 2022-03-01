const express = require('express')
const router = express.Router()
const multer = require("multer");
const { addRoom, getAllRoom, getFile, enableAllRoom,
    disableAllRoom,
    deleteAllRoom ,
    enableRoomById,
    disableRoomById,
    deleteRoomById,
    updateRoomById} = require('../controllers/roomController')

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

router.post('/addRoom', upload.single('file'), addRoom)
router.get('/getAllRoom', getAllRoom);
router.get('/getFile/:name', getFile);
router.delete('/', deleteAllRoom)
router.patch('/enableAllRoom', enableAllRoom)
router.patch('/disableAllRoom', disableAllRoom)
router.put('/:id', upload.single('file'), updateRoomById)
router.put('/enable/:id', enableRoomById)
router.put('/disable/:id', disableRoomById)
router.delete('/:id', deleteRoomById)


module.exports = router