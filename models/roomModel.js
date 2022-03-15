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
    },

    status: {
        type: Boolean,
        deafult: true

    },
    gallery_image: {
        type: Array,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('rooms', roomSchema)