import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Home from "./Home";

const ProtectedRoute = ({ children }) => {
  const sessionStoagetoken = JSON.parse(sessionStorage.getItem("token"));

  if (!sessionStoagetoken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
