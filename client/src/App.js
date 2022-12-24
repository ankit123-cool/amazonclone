import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect } from "react";
import Axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
function App() {
  const availaibleprod = [
    {
      name: "Macbook pro",
      price: 200000,
      link: "https://tse1.mm.bing.net/th?id=OIP.Ht8aApbCF142fhb1JRzYXQHaE7&pid=Api&P=0",
    },
    {
      name: "Iphone x",
      price: 75000,
      link: "https://tse1.mm.bing.net/th?id=OIP.t7f7QuCSArNFiOmxNQyF5gHaHa&pid=Api&rs=1&c=1&qlt=95&w=121&h=121",
    },
    {
      name: "Apple watch 12",
      price: 65000,
      link: "https://tse4.mm.bing.net/th?id=OIP.C0FwndsPPGyL6rLIF6OULwHaHw&pid=Api&P=0",
    },
    {
      name: "Puma ferrari shoes",
      price: 6500,
      link: "https://tse4.mm.bing.net/th?id=OIP.q2XZFuHB6BTJLDhEkStTjQHaIq&pid=Api&P=0",
    },
    {
      name: "Adidas jacket",
      price: 5000,
      link: "https://tse1.mm.bing.net/th?id=OIP.oO1nP5xAuJhcdAYzJDDu9AHaHa&pid=Api&P=0",
    },
    {
      name: "Hp keyboard",
      price: 2000,
      link: "https://tse1.mm.bing.net/th?id=OIP.y1IyYi-pCrFpGDYl3bFS5wHaFc&pid=Api&P=0",
    },
  ];

  const token = localStorage.getItem("token");
  //getting hold of user data

  const [username, setusername] = useState("");

  const ssd = async () => {
    await Axios.get("/userdata", {
      headers: { Authorization: token },
    })
      .then((res) => {
        if (res.status === 200) {
          setusername(res.data.username);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (token) {
      ssd();
    }
  }, []);

  const savetodb = async (name, price, quantity) => {
    await Axios.post(
      "/usercartupdate",
      {
        prodname: name,
        prodquantity: quantity,
        prodprice: price,
      },
      {
        headers: { Authorization: token },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          window.alert("added successfully");
        }
      })
      .catch((err) => {
        window.alert("already added");
      });
  };

  function handlecart(item) {
    const name = item.name;
    const price = item.price;
    const quantity = 1;

    savetodb(name, price, quantity);
  }

  const navigate = useNavigate();
  function handlenav(x) {
    navigate(x);
  }

  function handlelogout() {
    localStorage.removeItem("token");
    navigate("/home");
  }

  function handlecartwithoutl() {
    navigate("/signup");
  }

  if (token) {
    return (
      <div className="container mt-1">
        <div style={{ backgroundColor: "#343a40" }}>
          <nav class="navbar navbar-expand-lg navbar-dark">
            <a class="navbar-brand">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.YdkQGmhB9c2Sr84FeDD9egHaEK&pid=Api&rs=1&c=1&qlt=95&w=179&h=100"
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
                <li class="nav-item" onClick={() => handlenav("/cart")}>
                  <ShoppingCartIcon color="info" />
                </li>
                <li class="nav-item">
                  <button className="btn btn-outline-info">{username}</button>
                </li>
                <li class="nav-item">
                  <button
                    className="btn btn-outline-info"
                    onClick={handlelogout}
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {availaibleprod.map((eachprod) => {
            return (
              <div class="col">
                <div class="card">
                  <img
                    src={eachprod.link}
                    class="card-img-top"
                    height="200px"
                    width="100px"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">{eachprod.name}</h5>
                    <p class="card-text">Price: Rs.{eachprod.price}</p>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handlecart(eachprod)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
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

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {availaibleprod.map((eachprod) => {
            return (
              <div class="col">
                <div class="card">
                  <img
                    src={eachprod.link}
                    class="card-img-top"
                    height="200px"
                    width="100px"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">{eachprod.name}</h5>
                    <p class="card-text">Price: Rs.{eachprod.price}</p>
                    <button
                      className="btn btn-outline-success"
                      onClick={handlecartwithoutl}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
