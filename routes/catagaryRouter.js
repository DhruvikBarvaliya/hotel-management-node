const express = require('express')
const router = express.Router()
const { catagarySchema, getAllCatagary,deleteCatagaryByName,enableUserByName,
    disableUserByName,updateCategorieByName } = require('../controllers/catagaryController')

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/catagary");
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, req.body.catagary_name + '-' + file.fieldname + '-' + Date.now() + "." + extension);
    }
});
const upload = multer({ storage: storage });

router.post('/addCatagary', upload.single('file'), catagarySchema)
router.get('/getAllCatagary', getAllCatagary)
router.delete('/deleteCatagaryByName/:name', deleteCatagaryByName)
router.patch('/enable/:name', enableUserByName)
router.patch('/disable/:name', disableUserByName)
router.put('/updateCategorieByName/:name', upload.single('file'), updateCategorieByName)




module.exports = router