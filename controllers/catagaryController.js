const catagary = require('../models/catagaryModel')


const catagarySchema = (req, res) => {
    res.status(200).json({ message: "Catagary Successfully added" })

}
module.exports = {
    catagarySchema
}