import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar(){
    const {user , logoutUser} = useAuth();
    return(
        <div className="navbar bg-base-100 shadow-lg rounded-md">
            {
                user ? (
                    <>
                        <div className="navbar-start">
                            <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li><Link to={"/"} 
                                className="hover:bg-base-100 hover:border-b-2 hover:border-b-neutral hover:shadow-lg hover:py-1.5 hover:ease-in text-lg">uplodFile</Link></li>
                                <li><Link to={`/myfiles/${user?._id}`} 
                                className="hover:bg-base-100 hover:border-b-2 hover:border-b-neutral hover:shadow-lg hover:py-1.5 hover:ease-in text-lg">MyFiles</Link></li>
                            </ul>
                            </div>
                            <Link to={"/"} className="btn btn-ghost text-xl">FileHandling</Link>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                            <li>
                                <Link to={"/"} 
                                className="hover:bg-base-100 hover:border-b-2 hover:border-b-neutral hover:shadow-lg hover:py-1.5 hover:ease-in text-lg">
                                fileUpload
                                </Link>
                            </li>
                            <li>
                                <Link to={`/myfiles/${user._id}`} 
                                className="hover:bg-base-100 hover:border-b-2 hover:border-b-neutral hover:shadow-lg hover:py-1.5 hover:ease-in text-lg">MyFiles</Link></li>
                            </ul>
                        </div>
                        <div className="navbar-end">
                            <Link to={"/login"} className="btn btn-secondary text-white shadow-lg border-b-2 text-lg rounded-lg"
                            onClick={logoutUser}>Logout</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="navbar-start">
                            <Link to={"/"} className="btn btn-ghost text-xl">FileHandling</Link>
                        </div>
                        <div className="navbar-end">
                            <Link to={"/login"} className="btn btn-secondary text-white shadow-lg border-b-2 text-lg rounded-lg">Login</Link>
                        </div>
                    </>
                )
            }
        </div>
    )
}