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

    room_image: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        deafult: true

    },
    // gallery_image: {
    //     data: Buffer,
    //     contentType: String
    // },

}, {
    timestamps: true
})

module.exports = mongoose.model('rooms', roomSchema)