import React from 'react'
import { Navigate } from 'react-router';


export default function ProtectedRouteForAdmin({children}) {
   const user = JSON.parse(localStorage.getItem("users"));

   if(user?.role === "admin"){
    return children;
   }
   else{
    return <Navigate to= {"/login"}/>
   }
}
