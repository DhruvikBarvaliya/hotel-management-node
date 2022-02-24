const room = require('../models/roomModel')
 


const addRoom = async (req, res) => {
    const { name, description, rules, amenities, featured_image } = req.body

    try {
        const file = new room({
            name: req.body.name,
            description: req.body.description,
            rules: req.body.rules,
            amenities: req.body.amenities,
            featured_image: {
                fileName: req.body.featured_image.fileName,
                filePath: req.body.featured_image.filePath,
                fileType: req.body.featured_image.fileType,
                fileSize: fileSizeFormatter(req.body.featured_image.fileSize, 2)
            }
        });
        // Book.create(data).then(data => {
        //     res.send(data);
        // }).catch(error => {
        //     res.status(500).send({
        //         message: error.message || "Some error occurred while creating the Book."
        //     })
        // })
        await file.save();
        res.status(201).json({ message: 'File Upload Successfully' })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    res.status(200).json({ message: "Room Successfully added" })

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