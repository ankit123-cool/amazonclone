import Alert from "@mui/material/Alert";
import "./App.css";
import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
function Signup() {
  const [view, setview] = useState("Register");

  const [sev, setsev] = useState("");
  const [sevtxt, setsevtxt] = useState("");

  const [userreg, setuserreg] = useState({
    name: "Your Good name",
    email: "Your email-id",
    password: "Create a new password",
  });

  const [userlogin, setuserlogin] = useState({
    email: "Enter email-id",
    password: "Enter password",
  });

  function handlechange(event) {
    const { value, name } = event.target;

    setuserreg((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  const navigate = useNavigate();
  function handlechangel(event) {
    const { value, name } = event.target;

    setuserlogin((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handlereg(event) {
    event.preventDefault();

    fsdr();
  }

  const fsdr = async () => {
    await Axios.post("/userregistration", {
      Newusername: userreg.name,
      Newusermail: userreg.email,
      Newuserpassword: userreg.password,
    })
      .then((res) => {
        if (res.status === 200) {
          setsev("success");
          setsevtxt("Registration was successfull. Kindly login");
        }
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setsev("error");
          setsevtxt("Already Registered");
        }
        if (err.response.status === 500) {
          setsev("error");
          setsevtxt("Failed to Register");
        }
      });
    const blank = {
      name: "Your Good name",
      email: "Your email-id",
      password: "Create a new password",
    };

    setuserreg((prev) => {
      return {
        ...prev,
        ...blank,
      };
    });
  };

  function handlenav(x) {
    navigate(x);
  }

  function handlelog(event) {
    event.preventDefault();

    fsdl();
  }

  const fsdl = async () => {
    await Axios.post("/userlogin", {
      Usermail: userlogin.email,
      Userpassword: userlogin.password,
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);

          navigate("/home");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setsev("error");
          setsevtxt("Incorrect credentials");
        }
        if (err.response.status === 422) {
          setsev("error");
          setsevtxt("Incorrect credentials");
        }
      });
    const blank = {
      email: "Enter email-id",
      password: "Enter password",
    };

    setuserlogin((prev) => {
      return {
        ...prev,
        ...blank,
      };
    });
  };

  if (view === "Register") {
    return (
      <div className="container mt-1">
        <div style={{ backgroundColor: "#343a40" }}>
          <nav class="navbar navbar-expand-lg navbar-dark">
            <a class="navbar-brand">
              <img
                src=" https://tse1.mm.bing.net/th?id=OIP.YdkQGmhB9c2Sr84FeDD9egHaEK&pid=Api&rs=1&c=1&qlt=95&w=179&h=100"
                alt=""
                width="30"
                height="24"
                margin-right="100"
                class="d-inline-block align-text-top"
              />
              .Amazon.in
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item" onClick={() => handlenav("/home")}>
                  <HomeIcon color="info" />
                </li>
                <li class="nav-item" onClick={() => handlenav("/signup")}>
                  <Person2OutlinedIcon color="info" />
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="container mt-4">
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                class="form-control"
                id="exampleInputname"
                value={userreg.name}
                onChange={handlechange}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={userreg.email}
                onChange={handlechange}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                name="password"
                value={userreg.password}
                onChange={handlechange}
              />
            </div>

            <button
              className="btn btn-outline-success"
              onClick={handlereg}
              disabled={
                userreg.name === "Your Good name" ||
                userreg.email === "Your email-id" ||
                userreg.password === "Create a new password"
              }
            >
              Register
            </button>
            <button
              className="btn btn-outline-info"
              onClick={() => setview("Login")}
            >
              Login
            </button>
          </form>
        </div>
        <div style={{ visibility: sev != "" ? "visible" : "hidden" }}>
          <Alert severity={sev} onClose={() => setsev("")}>
            {sevtxt}
          </Alert>
        </div>
      </div>
    );
  }
  if (view === "Login") {
    return (
      <div className="container mt-1">
        <div style={{ backgroundColor: "#343a40" }}>
          <nav class="navbar navbar-expand-lg navbar-dark">
            <a class="navbar-brand">
              <img
                src=" https://tse1.mm.bing.net/th?id=OIP.YdkQGmhB9c2Sr84FeDD9egHaEK&pid=Api&rs=1&c=1&qlt=95&w=179&h=100"
                alt=""
                width="30"
                height="24"
                margin-right="100"
                class="d-inline-block align-text-top"
              />
              .Amazon.in
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item" onClick={() => handlenav("/home")}>
                  <HomeIcon color="info" />
                </li>
                <li class="nav-item" onClick={() => handlenav("/signup")}>
                  <Person2OutlinedIcon color="info" />
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="container mt-4">
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={userlogin.email}
                onChange={handlechangel}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                name="password"
                value={userlogin.password}
                onChange={handlechangel}
              />
            </div>

            <button
              className="btn btn-outline-success"
              onClick={handlelog}
              disabled={
                userlogin.email === "Enter email-id" ||
                userlogin.password === "Enter your password"
              }
            >
              Login
            </button>
            <button
              className="btn btn-outline-info"
              onClick={() => setview("Register")}
            >
              Register
            </button>
          </form>
        </div>
        <div style={{ visibility: sev != "" ? "visible" : "hidden" }}>
          <Alert severity={sev} onClose={() => setsev("")}>
            {sevtxt}
          </Alert>
        </div>
      </div>
    );
  }
}
export default Signup;
