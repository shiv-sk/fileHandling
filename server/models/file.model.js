const mongoose = require("mongoose");
const fileUploadSchema = new mongoose.Schema({
    fileName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    fileSize:{
        type:String,
        required:true,
        trim:true,
    },
    fileType:{
        type:String,
        required:true,
        trim:true,
    },
    fileLocation:{
        type:String,
        required:true,
        trim:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
} , {timestamps:true});

const FileUpload = mongoose.model("FileUpload" , fileUploadSchema);
module.exports = FileUpload;