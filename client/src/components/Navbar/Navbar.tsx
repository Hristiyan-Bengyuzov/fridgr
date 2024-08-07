import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import NavToggler from "./NavToggler";
import NavLinks from "./NavLinks";
import "../../assets/styles/Navbar.css";

export default function Navbar() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [navColour, setNavColour] = useState<boolean>(false);

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
      data-testid="navbar"
      className={`navbar navbar-expand-md fixed-top ${
        navColour ? "sticky" : "navbar"
      }`}
    >
      <div className="container">
        <img src={logo} className="img-fluid logo" alt="brand" />
        <NavToggler expanded={expanded} setExpanded={setExpanded} />
        <NavLinks expanded={expanded} setExpanded={setExpanded} />
      </div>
    </div>
  );
}
