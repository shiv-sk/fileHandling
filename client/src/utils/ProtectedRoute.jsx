import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({children}){
    const {user , isLoading} = useAuth();
    if(isLoading){
        return(
            <div className="min-h-screen flex justify-center items-center">
                <p>Loading...</p>
            </div>  
        )
    }
    if(!user){
        return <Navigate to={"/login"}/>
    }

    console.log("the user is from privatePage! " , user);
    return children;
}