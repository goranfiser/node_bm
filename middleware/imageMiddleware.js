const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify the upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '.' + file.mimetype.split('/')[1]); // specify the file name and extension
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // accept the file
  } else {
    cb(new Error('Invalid file type, only JPEG, PNG, and GIF are allowed!'), false); // reject the file
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5 // 5MB file size limit
};

const upload = multer({ storage, fileFilter, limits });

// module.exports = upload.single('image'); // specify the field name for the image file
module.exports = { upload };
