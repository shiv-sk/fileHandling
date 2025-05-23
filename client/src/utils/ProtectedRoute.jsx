import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({children}){
    const {user , isLoading} = useAuth();
    if(isLoading){
        return <p>Loading......</p>
    }
    if(!user){
        return <Navigate to={"/login"}/>
    }

    console.log("the user is from privatePage! " , user);
    return children;
}