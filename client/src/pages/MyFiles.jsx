import { useEffect, useState } from "react"
import { baseUrl, getAndDeleteReq } from "../apicalls/apicalls";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function MyFiles(){
    const [allFiles , setAllFiles] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const {user} = useAuth();
    useEffect(()=>{
        const getAllUserFiles = async()=>{
            if(!user || !user._id){
                return;
            }
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`${baseUrl}/file/user/files/${user._id}` , "get");
                if(response.status === "success"){
                    setAllFiles(response?.data || []);
                }
            } catch (error) {
                console.error("error from AllBlogs! " , error);
                toast.error(error?.response?.data?.message || "server Error!");
            }finally{
                setIsLoading(false);
            }
        }
        getAllUserFiles();
    } , [user])
    return(
        <div className="min-h-screen">
            <section className="md:h-screen flex flex-col justify-center items-center gap-4 py-5">
                <h1 className="font-bold text-lg px-4 py-2">MyFiles</h1>
                <div className="flex justify-center items-center flex-wrap gap-1.5">
                    {
                        isLoading ? "Loading..." :
                        allFiles && allFiles.length > 0 ? allFiles.map((file)=>(
                            <div className="card bg-base-100 w-96 shadow-lg" key={file._id}>
                                <div className="card-body">
                                    <h2 className="card-title">{file.fileName.split("-").splice(1) || "fileName"}</h2>
                                    <p>{file.fileSize || "fileSize"}Kb</p>
                                    <div className="card-actions justify-end">
                                    <Link to={`/file/detail/${file._id}`}>
                                        <button className="btn btn-secondary text-white shadow-lg border-b-2 rounded-lg">More</button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        )) : (<p>Files not found!</p>)
                    }
                </div>
            </section>
        </div>
    )
}