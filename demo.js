require("dotenv").config()

const express = require('express')
const aws = require('aws-sdk')
const bodyParser = require('body-parser')
const multer = require('multer')
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION
});

var app = express(),
    s3 = new aws.S3();

app.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

//open in browser to see upload form
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//use by upload form
app.post('/upload', upload.array('file', 5), function (req, res, next) {
    res.send("Uploaded!");
});

app.listen(7000, function () {
    console.log('Example app listening on port 3000!');
});