const multer  = require('multer');
const path = require("path");
const allowedMimeTypes = [
    "application/msword", 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml"];
const allowedExtensions = [".jpg" , ".jpeg" , ".doc" , ".docx" , ".pdf" , ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file is passed from here! ");
    cb(null, './temp/uploads')
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const fileFilter = (req, file, cb)=>{
  const fileExtension = path.extname(file.originalname).toLocaleLowerCase();
  if(allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(fileExtension)){
    cb(null , true);
  }
  else{
    const error = new Error("Invalid file type.");
    error.code = "INVALID_FILE_TYPE";
    cb(error, false);
  }
}

const upload = multer({ 
  storage: storage,
  fileFilter,
  limits:{
    fileSize:1 * 1024 * 1024,
  }
})
module.exports = upload;