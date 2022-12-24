import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const AuthProvider = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState("loading");

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn === true) {
    return props.children;
  } else {
    navigate("/signup");
  }
};

export default AuthProvider;
