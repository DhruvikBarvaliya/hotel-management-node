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

    featured_image: {

        fileName: {
            type: String,
            required: true
        },
        filePath: {
            type: String,
            required: true
        },
        fileType: {
            type: String,
            required: true
        },
        fileSize: {
            type: String,
            required: true
        }
    },

    // gallery_image: {
    //     data: Buffer,
    //     contentType: String
    // },

}, {
    timestamps: true
})

module.exports = mongoose.model('rooms', roomSchema)