
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

module.exports = { upload }


/* const AWS = require('aws-sdk');

const ID = 'AKIA3ICHFA4MHEMIFOOX';
const SECRET = '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';
const BUCKET_NAME = 'hotel-management-node-image';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        LocationConstraint: "ap-south-1"
    }
};

s3.createBucket(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket Created Successfully', data.Location);
}); */