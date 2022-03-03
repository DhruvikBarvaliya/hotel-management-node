const express = require('express')
const router = express.Router()
const catagaryController = require('../controllers/catagaryController')

router.post('/addCatagary', catagaryController.catagarySchema)
router.get('/getAllCatagary', catagaryController.getAllCatagary)
router.put('/updateCategorieByName/:name', catagaryController.updateCategorieByName)
router.patch('/enable/:name', catagaryController.enableUserByName)
router.patch('/disable/:name', catagaryController.disableUserByName)
router.delete('/deleteCatagaryByName/:name', catagaryController.deleteCatagaryByName)




module.exports = router