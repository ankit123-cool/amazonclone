import React, { useState } from "react";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
function Cart() {
  const token = localStorage.getItem("token");
  //getting hold of user data
  const [sev, setsev] = useState("");
  const [sevtxt, setsevtxt] = useState("");
  const [rows, setrows] = useState([]);
  const [res, setres] = useState(0);
  const [username, setusername] = useState("");
  const ssd = async () => {
    await Axios.get("/usercartdata", {
      headers: { Authorization: token },
    })
      .then((res) => {
        if (res.status === 200) {
          const goti = res.data.user.mycart;
          setusername(res.data.user.name);
          let w = 0;
          goti.map((each) => {
            w += each.price * each.quantity;
          });

          setres(w);
          setrows(goti);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    ssd();
  }, []);

  const deltodb = async (producttitle) => {
    await Axios.post(
      "/usercartdelete",
      {
        prodname: producttitle,
      },
      {
        headers: { Authorization: token },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          ssd();
          setsev("success");
          setsevtxt("Deleted successfully");
        }
      })
      .catch((err) => {
        setsev("error");
        setsevtxt("Error occured");
      });
  };

  function handledel(e) {
    deltodb(e.producttitle);
  }

  const navigate = useNavigate();
  function handlenav(x) {
    navigate(x);
  }

  function handlelogout() {
    localStorage.removeItem("token");
    navigate("/home");
  }

  if (res === 0) {
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
        <div className="container mt-4" style={{ textAlign: "center" }}>
          <img src="https://tse2.mm.bing.net/th?id=OIP.YOaL_aGRkdbMxovZMn0DIgHaFj&pid=Api&P=0"></img>
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
        <div style={{ textAlign: "center" }}>Your cart</div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product name</TableCell>
                <TableCell align="right">Product price</TableCell>
                <TableCell align="right">Product quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.producttitle}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.producttitle}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    <DeleteIcon onClick={() => handledel(row)} />
                    {row.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          class="container mt-4"
          style={{
            textAlign: "center",
            visibility: res != 0 ? "visible" : "hidden",
          }}
        >
          <h3>Total amount: Rs.{res}</h3>
          <button className="btn btn-outline-info">Check out</button>
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
export default Cart;
