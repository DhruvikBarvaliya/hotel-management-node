// const room = require('../models/roomModel')



const addRoom = (req, res) => {
    res.status(200).json({ message: "Room Successfully added" })

}
module.exports = {
    addRoom
}