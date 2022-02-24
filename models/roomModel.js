const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    name: {
        type: String,
    },

    description: {
        type: String,
    },

    rules: {
        type: String,
    },

    amenities: {
        type: Array,
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

    // gallery_image: {
    //     data: Buffer,
    //     contentType: String
    // },

}, {
    timestamps: true
})

module.exports = mongoose.model('rooms', roomSchema)