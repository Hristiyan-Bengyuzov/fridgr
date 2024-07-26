import { Link } from "react-router-dom";
import NavTogglerProps from "../../types/Navbar/NavbarProps";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Avatar } from "antd";

export default function NavLinks({ expanded, setExpanded }: NavTogglerProps) {
  const authContext = useContext(AuthContext);

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
            to="/recipes"
            className="nav-link"
            onClick={() => setExpanded(false)}
          >
            Recipes
          </Link>
        </li>
        {authContext?.user ? (
          <>
            <li className="nav-item">
              <Link
                to="/profile"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                <div style={{ display: "flex" }}>
                  Profile
                  <Avatar
                    src={authContext.user.image}
                    size={36}
                    style={{ marginLeft: "8px" }}
                  />
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/logout"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link
                to="/register"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Register
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
          </>
        )}
      </ul>
    </div>
  );
}
