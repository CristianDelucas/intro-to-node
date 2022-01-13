const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const { defaults } = require('../utils');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: defaults(process.env.NODE_ENV, 'development')
    }});

const upload = multer({storage});

module.exports = upload;