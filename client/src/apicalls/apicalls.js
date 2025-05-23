import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;
// const baseUrl = "http://localhost:4000/api/v1" -----> for localuse
const getAndDeleteReq = async(url , method)=>{
    try {
        const config = {
            url,
            method,
            headers:{
                "Content-Type": "application/json",
                'Connection': 'keep-alive'
            },
            withCredentials:true
        }
        const response = await axios(config);
        console.log("response from getAndDeleteReq! " , response?.data);
        return response?.data;
    } catch (error) {
        console.log("error from getAndDeleteReq! " , error?.response?.data);
        throw error;
    }
}

const postAndPatchReq = async(url , method , data , isFormData = false , onUploadProgress = null)=>{
    try {
        const config = {
            url,
            method,
            data,
            headers:{
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
                'Connection': 'keep-alive'
            },
            withCredentials:true,
        }
        if(onUploadProgress){
            config.onUploadProgress = onUploadProgress;
        }
        const response = await axios(config);
        console.log("response from postAndPatchReq!", response?.data);
        return response?.data;
    } catch (error) {
        console.log("error from getAndDeleteReq! " , error?.response);
        throw error;
    }
}

export {baseUrl , getAndDeleteReq , postAndPatchReq};