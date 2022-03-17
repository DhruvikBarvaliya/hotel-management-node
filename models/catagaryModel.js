const mongoose = require('mongoose')

const catagarySchema = mongoose.Schema({
    catagary_name: {
        type: String,
    },

    catagary_image: {
        type: String,
        trim: true
    },
    status: {
        type: Boolean,
        deafult: true
    },

}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('catagary', catagarySchema)