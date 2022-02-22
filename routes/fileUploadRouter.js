const express = require('express')
const router = express.Router()
const { upload } = require('../helper/fileHelper')
const { singleFileUpload, getallSingleFiles } = require('../controllers/fileUploadControler')

router.post('/singleFile', upload.single('file'), singleFileUpload)
router.get('/getAllSingleFiles', getallSingleFiles);
// router.get('/getSingleFiles/:name', getallSingleFiles);

module.exports = router