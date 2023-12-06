import multer from 'multer'

export const Multer = multer({
    storage: multer.memoryStorage()
})