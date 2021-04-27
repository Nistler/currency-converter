import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

const Nav = () => {
  return (
    <nav className="fixed-top">
      <div className="container-md">
        <nav className="navbar navbar-expand navbar-dark flex-nowrap flex-row justify-content-around">
          <a href="/" className="navbar-brand ">
            Logo
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link " to="/">
                Converter
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rates">
                Rates
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Nav;
