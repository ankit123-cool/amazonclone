import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Signup from "./Signup";
import Cart from "./Cart";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthProvider from "./AuthProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route index path="/home" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/cart"
          element={
            <AuthProvider>
              <Cart />
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
