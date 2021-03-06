const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')
const auth = require("../middleware/auth")
const { upload } = require("../create-bucket")

router.post('/addRoom', auth, upload.array('room_image', 1), roomController.addRoom)
router.get('/getAllRoom', auth, roomController.getAllRoom);
router.put('/:id', auth,upload.array('room_image', 1), roomController.updateRoomById)
router.patch('/enableAllRoom', auth, roomController.enableAllRoom)
router.patch('/disableAllRoom', auth, roomController.disableAllRoom)
router.patch('/enable/:id', auth, roomController.enableRoomById)
router.patch('/disable/:id', auth, roomController.disableRoomById)
router.delete('/', auth, roomController.deleteAllRoom)
router.delete('/:id', auth, roomController.deleteRoomById)


module.exports = router