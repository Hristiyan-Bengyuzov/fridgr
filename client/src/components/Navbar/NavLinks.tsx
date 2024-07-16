import { Link } from "react-router-dom";
import NavTogglerProps from "../../types/Navbar/NavbarProps";

export default function NavLinks({ expanded, setExpanded }: NavTogglerProps) {
  return (
    <div
      className={`collapse navbar-collapse ${expanded ? "show" : ""}`}
      id="navbarResponsive"
    >
      <ul className="navbar-nav ms-auto links">
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={() => setExpanded(false)}>
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
  );
}
