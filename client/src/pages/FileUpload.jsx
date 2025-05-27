import { useState } from 'react';
import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { baseUrl, postAndPatchReq } from '../apicalls/apicalls';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
export default function FileUpload(){
    const [files , setFiles] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const {user} = useAuth();
    const onDrop = useCallback((acceptedFiles , fileRejections)=>{
        if(fileRejections.length > 0){
            console.log("Rejected files:", fileRejections);
            let errorType = fileRejections[0].errors[0].code;
            if(errorType === "file-invalid-type"){
                toast.error("only pdf , msword , excel , image are allowed! ")
            }else if(errorType === "file-too-large"){
                toast.error("only 1MB file is allowed!");
            }
            return;
        }
        if(acceptedFiles.length > 0){
            setFiles(acceptedFiles.map((file)=>(
                Object.assign(file , {preview:URL.createObjectURL(file)})
            )))
        }
    } , []);

    const filePreview = ()=>{
        if(!files || files.length === 0){
            return null;
        }
        return files.map((file , index)=>{
            if(file.type.startsWith("image/")){
                return (
                    <div key={index} className="mt-4">
                        <img src={file.preview} alt={`preview-${index}`} className="h-40" />
                    </div>
                )
            }
            if(file.type === "application/pdf"){
                return(
                    <div key={index} className="mt-4">
                        <iframe src={file.preview}  width="100%" height="400px" />
                    </div>
                )
            }
            return(
                <div key={index} className="mt-4">
                    <p>{file.name} (No preview available)</p>
                </div>
            )
        })
    }
    const MAX_FILE_SIZE = 1 * 1024 * 1024;
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxSize:MAX_FILE_SIZE,
        multiple:2,
        accept:{
        'application/pdf': [],
        'application/msword': [],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
        'image/jpeg':[],
        'image/png': [],
        'image/gif': [],
        'image/webp': [],
        'image/svg+xml': [],
        }
    })
    const [progress , setProgress] = useState(0);
    const onUploadProgress = (progressEvent)=>{
        console.log(progressEvent);
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percent);
    }
    const handleUpload = async(e)=>{
        e.preventDefault();
        if(!user || !user._id){
            toast.error("please login! ");
            return;
        }
        else if(files.length === 0){
            toast.error("please select file!");
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();
            files.forEach(file => formData.append("files" , file));
            formData.append("user" , user._id);
            const response = await postAndPatchReq(`${baseUrl}/file` , "post" , formData , true , onUploadProgress);
            console.log("response from handleUpload! " , response);
            if(response.status === "success"){
                toast.success("file uploaded successfully! ");
            }
        } catch (error) {
            console.log("error from fileUploading..!", error);
            const errorMessage = error?.response?.data?.message;
            toast.error(errorMessage || "ServerError");
        }finally{
            setIsLoading(false);
        }
    }
    return(
        <div className="flex justify-center items-center min-h-screen w-96 mx-auto flex-col gap-2.5">
            <p>Only Image , Pdf , Docx files are allowed</p>
            {
                progress > 0 && (
                    <div className="flex flex-col items-center gap-1">
                        <progress className="progress progress-secondary w-56" value={progress} max="100"/>
                        <span>{progress}% completed</span>
                    </div>
                )
            }
            <div 
            {...getRootProps()}
            className="border-dashed border-2 p-10 text-center cursor-pointer w-full shadow-lg">
                <input {...getInputProps()} />
                {
                    isLoading ? "Processing..." :
                    isDragActive ? <p>Drop the file here ...</p> : <p>Drag 'n' drop files here, or click to select files</p>
                }
            </div>
            {filePreview()}
            <p>maxFileSize 1MB</p>
            {
                files && files.length > 0 ? files.map((file , index)=>(
                    <div className="flex flex-col items-center gap-1" key={index}>
                        <span>selectedFileName: {file?.name}</span>
                        <span>selectedFileSize: {(file?.size / 1024).toFixed(2)}Kb</span>
                    </div>
                )   
                ) : ""
            }
            <button className="btn btn-secondary" type='button' onClick={handleUpload}>upload</button>
        </div>
    )
}