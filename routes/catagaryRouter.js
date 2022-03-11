const express = require('express')
const router = express.Router()
const catagaryController = require('../controllers/catagaryController')
const auth = require("../middleware/auth")

router.post('/addCatagary', auth, catagaryController.catagarySchema)
router.get('/getAllCatagary', auth, catagaryController.getAllCatagary)
router.put('/updateCategorieByName/:name', auth, catagaryController.updateCategorieByName)
router.patch('/enable/:name', auth, catagaryController.enableUserByName)
router.patch('/disable/:name', auth, catagaryController.disableUserByName)
router.delete('/deleteCatagaryByName/:name', auth, catagaryController.deleteCatagaryByName)




module.exports = router