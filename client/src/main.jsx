import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import {createBrowserRouter , RouterProvider} from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import FileUpload from './pages/FileUpload.jsx';
import FileDetail from './pages/FileDetail.jsx';
import MyFiles from './pages/MyFiles.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Regitser.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<FileUpload/>
      },
      {
        path:"file/detail/:fileId",
        element:<FileDetail/>
      },
      {
        path:"myfiles/:userId",
        element:<MyFiles/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}/>
    <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
    </AuthProvider>
  </StrictMode>,
)
