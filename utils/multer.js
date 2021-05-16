const multer = require('multer');
const path = require('path')

// storage engine for multer
const storage = multer.diskStorage({
  // THIS IS WHERE FILES WILL BE STORED
  destination: (req, file, cb) => {
    cb(null, '/public/uploads')
  },
  // THIS IS HOW THE FILENAME WILL BE RENDERED
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} -wagtag-${file.originalname}`);
  }
});

// file type check function
const checkFileType = (file, cb) => {
  // allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    cb('Error: File must be image!')
  }
}

// init upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: checkFileType
});


module.exports = upload