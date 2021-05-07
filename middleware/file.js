const multer = require('multer')
const shajs = require('sha.js')
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/images')
    },
    filename(req, file, cb) {
        cb(null, shajs('sha224').update(new Date().toLocaleString()).digest('hex').slice(20) + file.originalname)
    }
})

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage, fileFilter
})