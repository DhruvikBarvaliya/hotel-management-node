const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')

router.post('/addRoom', roomController.addRoom)
router.get('/getAllRoom', roomController.getAllRoom);
router.put('/:id', roomController.updateRoomById)
router.patch('/enableAllRoom', roomController.enableAllRoom)
router.patch('/disableAllRoom', roomController.disableAllRoom)
router.patch('/enable/:id', roomController.enableRoomById)
router.patch('/disable/:id', roomController.disableRoomById)
router.delete('/', roomController.deleteAllRoom)
router.delete('/:id', roomController.deleteRoomById)


module.exports = router