const mongoose = require('mongoose')

const catagarySchema = mongoose.Schema({
    catagary_name: {
        type: String,
    },

    image: {
        data: Buffer,
        contentType: String
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('catagary', catagarySchema)