const multer = require('multer');
const path = require('path');

// Define storage configuration for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    }
})

// Create a middleware function that uses the multer library to handle image uploads
const uploadImage = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Check file type
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File type not allowed'));
    }
}).single('product_image');

// Export the middleware function
module.exports = uploadImage;
