import React, { useState } from "react";
import ResponsiveAppBar from "./Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const message = useSelector((state) => state.token);
  const token = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [message]);
  return (
    <div>
      <ResponsiveAppBar />
      <div className="homeBody">
        <div className="changePosition">
          <h1>Welcome to My Website </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
