const express = require('express')
const router = express.Router()
const catagaryController = require('../controllers/catagaryController')
const auth = require("../middleware/auth")
const { upload } = require("../create-bucket")

router.post('/addCatagary', auth, upload.array('catagary_image', 1), catagaryController.catagarySchema)
router.get('/getAllCatagary', auth, catagaryController.getAllCatagary)
router.put('/updateCategorieByName/:name', auth, upload.array('catagary_image', 1), catagaryController.updateCategorieByName)
router.patch('/enable/:name', auth, catagaryController.enableUserByName)
router.patch('/disable/:name', auth, catagaryController.disableUserByName)
router.delete('/deleteCatagaryByName/:name', auth, catagaryController.deleteCatagaryByName)




module.exports = router