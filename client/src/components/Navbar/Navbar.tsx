import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "../../assets/styles/Navbar.css";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [navColour, setNavColour] = useState(false);

  const scrollHandler = () => {
    setNavColour(window.scrollY >= 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div
      className={`navbar navbar-expand-md fixed-top ${
        navColour ? "sticky" : "navbar"
      }`}
    >
      <div className="container">
        <img src={logo} className="img-fluid logo" alt="brand" />
        <button
          className={`navbar-toggler ${!expanded ? "collapsed" : ""}`}
          type="button"
          aria-controls="responsive-navbar-nav"
          aria-label="Toggle navigation"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div
          className={`collapse navbar-collapse ${expanded ? "show" : ""}`}
          id="navbarResponsive"
        >
          <ul className="navbar-nav ms-auto links">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/recipes"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
