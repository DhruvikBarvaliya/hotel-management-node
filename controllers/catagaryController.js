const catagary = require('../models/catagaryModel')


const catagarySchema = async(req, res) => {
    const { catagary_name, imageName, imagePath, imageType, imageSize } = req.body
    try {
        const file = new catagary({
            catagary_name,
            imageName,
            imagePath,
            imageType,
            imageSize: fileSizeFormatter(imageSize, 2)
        });
        await file.save();
        res.status(201).json({ message: 'Catagary Successfully added with Image File Upload' })

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
    catagarySchema
}