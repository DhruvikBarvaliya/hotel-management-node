const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/register', userController.registerUser)
router.post('/login', userController.login)
router.get('/', userController.getAllUser)
router.put('/:email', userController.updateUserByEmail)
router.patch('/enableAllUser', userController.enableAllUser)
router.patch('/disableAllUser', userController.disableAllUser)
router.patch('/enable/:email', userController.enableUserByEmail)
router.patch('/disable/:email', userController.disableUserByEmail)
router.delete('/', userController.deleteAllUser)
router.delete('/:email', userController.deleteUserByEmail)

module.exports = router