const room = require('../models/roomModel')



const addRoom = async (req, res) => {
    const { name, description, rules, amenities, imageName, imagePath, imageType, imageSize } = req.body

    try {
        const file = new room({
            name,
            description,
            rules,
            amenities,
            imageName,
            imagePath,
            imageType,
            imageSize: fileSizeFormatter(imageSize, 2)
        });
        // Book.create(data).then(data => {
        //     res.send(data);
        // }).catch(error => {
        //     res.status(500).send({
        //         message: error.message || "Some error occurred while creating the Book."
        //     })
        // })
        await file.save();
        res.status(201).json({ message: 'Room Successfully added with Image File Upload' })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}
module.exports = {
    addRoom
}