import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from 'react-toastify';

export default function Register(){
    const {registerUser , isLoading} = useAuth();
    const [registerData , setRegisterData] = useState({
        name:"",
        email:"",
        password:""
    });
    const navigate = useNavigate();
    const handleOnChange = (e)=>{
        setRegisterData({...registerData , [e.target.name]:e.target.value})
    }
    const handleRegister = async (e)=>{
        e.preventDefault();
        const response = await registerUser(registerData);
        if(response.success){
            console.log("Registration successful!", response.data);
            navigate("/");
        }else{
            console.log("Registration failed:", response.error);
            toast.error(response.error || "server Error!");
        }
    }
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5">
            <div className="max-w-sm w-full bg-base-100 p-6 rounded-lg shadow-md shadow-base-300">
                <h1 className="text-center font-bold text-2xl mb-1.5 border-b-2 border-neutral shadow-lg rounded-lg py-1.5">Register</h1>
                <div className="">
                    <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <label htmlFor="name" className="text-sm font-medium mb-1">Name</label>    
                    <input
                    name="name"
                    id="name" 
                    type="text" 
                    placeholder="Enter your name" 
                    className="input w-full"
                    value={registerData.name}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
                    <input
                    name="email" 
                    type="email"
                    id="email" 
                    placeholder="exp@email.com" 
                    className="input w-full"
                    value={registerData.email}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="password" className="text-sm font-medium mb-1">password</label>
                    <input
                    name="password" 
                    type="password"
                    id="password" 
                    placeholder="pass@123" 
                    className="input w-full"
                    value={registerData.password}
                    onChange={handleOnChange} 
                    required
                    />
                    <p>Already have an account <Link to={"/login"}>
                    <span className="hover:border-b-2 border-b-2 text-warning hover:text-info">Login</span></Link></p>
                    <button className="btn btn-secondary w-full text-white text-lg shadow-lg border-b-2 rounded-lg" 
                    type="submit" disabled={isLoading}>
                        {isLoading ? "Processing..." : "Register"}
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
}