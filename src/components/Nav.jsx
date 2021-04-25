import React from "react";
import { Link } from "react-router-dom";
import "../styles/Converter.css";

const Nav = () => {
  return (
    <nav>
      <h3>Logo</h3>
      <ul className="nav-links">
        <Link className="nav-link" to="/">
          <li>Converter</li>
        </Link>
        <Link className="nav-link" to="/rates">
          <li>Rates</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
