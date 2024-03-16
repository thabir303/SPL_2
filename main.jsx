import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Component/Root';
import Home from './Component/Home';
// import Me from './Component/Me';
import SignIn from './Component/SignIn';
// import SignUp from '../../frontend/src/components/SignUp';
import SignUp from './Component/SignUp';
import NewSubmit from './Component/NewSubmit';
import ForgetPassword from './Component/ForgetPassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      // {
      //   path:"/me",
      //   element:<Me>  </Me>
      // },
      {
        path:"/signin",
        element:<SignIn></SignIn>
      },
      {
        path:"/signup",
        element:<SignUp></SignUp>
      },
      {
        path:"/submit-otp",
        element:<NewSubmit></NewSubmit>
      },
      {
        path:"/send-otp",
        element:<ForgetPassword></ForgetPassword>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
