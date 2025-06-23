import React from "react";
import { Navigate } from "react-router";


export default function ProtectedRouteForUser({children}){
    const user = JSON.parse(localStorage.getItem("users"));
    if(user?.role === "user"){
        return children;
    }
    else{
        return <Navigate to={"/login"}/>
        
    }
}