import multer from 'multer'

const storage = multer.diskStorage({
      filename:function(req,file,callback){
            callback(null,file.originalname)
      }
})
// Configure multer to use the storage settings
const upload = multer({storage})

export default upload