const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require("../middleware/auth")

router.post('/register', userController.registerUser)
router.post('/login', userController.login)
router.get('/', auth, userController.getAllUser)
router.put('/:email', auth, userController.updateUserByEmail)
router.patch('/enableAllUser', auth, userController.enableAllUser)
router.patch('/disableAllUser', auth, userController.disableAllUser)
router.patch('/enable/:email', auth, userController.enableUserByEmail)
router.patch('/disable/:email', auth, userController.disableUserByEmail)
router.delete('/', auth, userController.deleteAllUser)
router.delete('/:email', auth, userController.deleteUserByEmail)

module.exports = router