const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
    banner_image: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Email field is required']
    },
    status: {
        type: Boolean,
        deafult: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('banner', bannerSchema)