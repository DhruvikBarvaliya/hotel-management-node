const mongoose = require('mongoose')

module.exports = () => {

    const url = "mongodb://127.0.0.1:27017/hotel"
    mongoose.connect(url, { useNewUrlParser: true })

    const db = mongoose.connection
    db.once('open', _ => {
        console.log('Database connected:', url)
    })

    db.on('error', err => {
        console.error('connection error:', err)
    })
}
