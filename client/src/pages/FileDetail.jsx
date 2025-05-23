import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { baseUrl, getAndDeleteReq } from "../apicalls/apicalls";

export default function FileDetail(){
    const [file , setFile] = useState(null);
    const [isLoading , setIsLoading] = useState(false);

    const {fileId} = useParams();

    useEffect(()=>{
        const getFile = async()=>{
            if(!fileId){
                return;
            }
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`${baseUrl}/file/${fileId}` , "get");
                if(response.status === "success"){
                    setFile(response?.data || []);
                }
            } catch (error) {
                console.error("get BlogLike error! " , error);
            }finally{
                setIsLoading(false);
            }
        }
        getFile();
    } , [fileId]);
    return(
        <div className="flex flex-col items-center min-h-screen gap-4 py-5 px-4">
            <div className="max-w-2xl w-full p-6 rounded-xl shadow-lg space-y-4">
                {
                    isLoading ? "Loading..." :
                    file ? (
                        <>
                            <h2 className="text-2xl font-semibold">{file?.fileName.split("-").slice(1) || "FileName"}</h2>
                            <a href={file.fileLocation} target="_blank" download="original-file-name.jpg" rel="noopener noreferrer" 
                            className="hover:text-info">
                                ViewFile
                            </a>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-2.5">
                                <span className="bg-info text-white px-2 py-1 rounded-md">
                                    fileSize: {file?.fileSize || "FileSize"}Kb
                                </span>
                                <span className="bg-primary text-white px-2 py-1 rounded-md">
                                    fileType: {file?.fileType || "FileType"}
                                </span>
                                <span className="bg-neutral text-white px-2 py-1 rounded-md">
                                    {file.createdAt ? new Date(file?.createdAt).toDateString() : "FileCreatedDate"}
                                </span>
                            </div>
                        </>
                    ) : (<p>File not found!</p>)
                }
            </div>
        </div>
    )
}