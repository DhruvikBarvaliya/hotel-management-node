const mongoose = require('mongoose')

const catagarySchema = mongoose.Schema({
    catagary_name: {
        type: String,
    },

    imageName: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    imageType: {
        type: String,
        required: true
    },
    imageSize: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('catagary', catagarySchema)