const { MulterError } = require("multer");
const ApiError = require("./apiError");
const globalErrorHandler = (err , req , res , next)=>{
    let customError;
    if(err instanceof MulterError){
        if(err.code === "LIMIT_FILE_SIZE"){
            customError = new ApiError(400, "File size should not exceed 1MB.");
        }
        else{
            customError = new ApiError(400, "File upload error: " + err.message);
        }
    }
    if(err.code === "INVALID_FILE_TYPE"){
        customError = new ApiError(400, err.message);
    }
    else{
        customError = new ApiError(err.statusCode || 500, err.message || "Something went wrong");
    }
    return res.status(customError.statusCode).json({
        statusCode: customError.statusCode,
        message: customError.message,
        errors: customError.errors,
        data: customError.data,
        status: customError.status
    })
}

module.exports = globalErrorHandler;