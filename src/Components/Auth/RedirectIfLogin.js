import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdmin = () => {
    var authenticate = sessionStorage.getItem('token');
    if(authenticate){
        return <Navigate to="/" replace/> 
    }else{
        return <Outlet /> 
    } 
}

export default ProtectedAdmin;