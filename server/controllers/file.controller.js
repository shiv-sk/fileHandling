const FileUpload = require("../models/file.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const uploadOnCloudinary = require("../utils/uploadonCloudinary");

//create newFile
exports.readFile = asyncHandler(async(req , res)=>{
    const {user} = req.body;
    console.log("the request is! " , req);
    if(!user){
        throw new ApiError(400 , "user is missing or not valid");
    }
    const uploadedFiles = req.files;
    if(uploadedFiles.length === 0){
        throw new ApiError(400 , "file is missing");
    }
    console.log("uploaded files! " , uploadedFiles);
    const uploadResults = [];
    for(const file of uploadedFiles){
        const filePath = file?.path;
        if(!filePath){
            throw new ApiError(500 , "filePath is not found! ");
        }
        const uploadToCloudinary = await uploadOnCloudinary(filePath);
        if(!uploadToCloudinary){
            throw new ApiError(500 , "file is not uploaded to cloudinary! ");
        }
        const newFile = await FileUpload.create({
            fileName:file.filename,
            fileSize:(file.size / 1024).toFixed(4),
            fileType:file.mimetype,
            fileLocation:uploadToCloudinary,
            user
        })
        uploadResults.push(newFile);
    }
    
    return res.status(201).json(
        new ApiResponse("data to store in file! " , uploadResults , 201)
    )
})

//get a Single File
exports.getAFile = asyncHandler(async (req,res)=>{
    const {fileId} = req.params;
    if(!fileId){
        throw new ApiError(400 , "fileId is missing or not valid");
    }
    const file = await FileUpload.findById(fileId).populate("user" , "name");
    if(!file){
        throw new ApiError(404 , "file not found!");
    }
    return res.status(200).json(
        new ApiResponse("file is" , file , 200)
    )
})

//get a user Files
exports.allUserFiles = asyncHandler(async (req,res)=>{
    const {userId} = req.params;
    if(!userId){
        throw new ApiError(400 , "userId is missing or not valid");
    }
    //finding a specific user Blogs
    const files = await FileUpload.find({user:userId});
    if(files.length === 0){
        throw new ApiError(404 , "files not found!");
    }
    return res.status(200).json(
        new ApiResponse("user files are" , files , 200)
    )
})