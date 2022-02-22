const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']

    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']

    },
    conform_password: {
        type: String,
        required: [true, 'Conform Password field is required']

    },
    phone_no: {
        type: String,
        required: [true, 'Phone No. field is required']

    },
    tc: {
        type: Boolean,
        required: [true, 'Terms And Condition field is required'],
        deafult: false

    },
}, {
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)