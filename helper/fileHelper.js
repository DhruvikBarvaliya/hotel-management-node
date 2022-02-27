const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(req.url == '/addCatagary');
        if (req.url == '/addCatagary') {
            callback(null, 'uploads/catagary')
        } else {
            callback(null, 'uploads/room')

        }
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now() + "." + extension);
    }
})

// const gstorage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'uploads/room/galary')


//     },
//     filename: function (req, file, cb) {
//         let extArray = file.mimetype.split("/");
//         let extension = extArray[extArray.length - 1];
//         cb(null, file.fieldname + '-' + Date.now() + "." + extension);
//     }
// })
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })
// const gupload = multer({ gstorage: gstorage, fileFilter: fileFilter })

module.exports = {
    upload,
    // gupload 
}