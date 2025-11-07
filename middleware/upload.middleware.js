import multer from "multer";

const storage = multer.memoryStorage()
const fileFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith('image/')) cb(null, true)        //checks whether the file type is image and then sends it for storing in backend
    else cb(new Error('Only images are allowed'), false)
}

export const upload =multer( {
    storage,
    fileFilter,
    limit: {fileSize: 5 * 1024 * 1024}

})

export default upload;