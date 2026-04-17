const multer  = require('multer')

// store file temporarily
const storage = multer.diskStorage({})

module.exports = { upload: multer({ storage }) }