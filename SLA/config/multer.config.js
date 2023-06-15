const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

require('dotenv').config()

const cloudName = process.env.cloudName
const apiKey = process.env.apiKey
const apiSecret = process.env.apiSecret

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      // console.log(file.originalname)
      // console.log('buffer',file.buffer)
      const splitName = file.originalname.split(".")
      cb(null, `${file.fieldname}-${uniqueSuffix}.${splitName[splitName.length - 1]}`)
  }
})
const upload = multer({ storage: storage })
 
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'project2',
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const splitName = file.originalname.split(".")
      return `${file.fieldname}-${uniqueSuffix}.${splitName[splitName.length - 1]}`
   },
  },
});
 
const multerStorageCloudinary = multer({ storage: cloudinaryStorage });

module.exports = { upload: upload, multerStorageCloudinary };


