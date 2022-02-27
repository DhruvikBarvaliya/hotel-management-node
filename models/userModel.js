const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']

    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Email field is required']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password field is required']

    },
    phone: {
        type: String,
        required: [true, 'Phone No. field is required']

    },
    user_img: {
        type: String,
        trim: true
    },
    tc: {
        type: Boolean,
        required: [true, 'Terms And Condition field is required'],
        deafult: false

    },
    status: {
        type: Boolean,
        deafult: true

    },
}, {
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)