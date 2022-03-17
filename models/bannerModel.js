const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
    banner_image: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        deafult: true
    },

}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('banner', bannerSchema)