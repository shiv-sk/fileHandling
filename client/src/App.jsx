import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

export default function App(){
  return(
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}