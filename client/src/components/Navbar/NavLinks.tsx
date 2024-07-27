import { Link } from "react-router-dom";
import NavTogglerProps from "../../types/Navbar/NavbarProps";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Avatar, Popover } from "antd";
import {
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";

export default function NavLinks({ expanded, setExpanded }: NavTogglerProps) {
  const authContext = useContext(AuthContext);

  return (
    <div
      className={`collapse navbar-collapse ${expanded ? "show" : ""}`}
      id="navbarResponsive"
    >
      <ul className="navbar-nav ms-auto links">
        <li className="nav-item">
          <div className="link-container">
            <Link
              to="/"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              <div className="d-flex">
                <HomeOutlined style={{ marginRight: "12px" }} />
                Home
              </div>
            </Link>
          </div>
        </li>
        <li className="nav-item">
          <Link
            to="/recipes"
            className="nav-link"
            onClick={() => setExpanded(false)}
          >
            <div className="d-flex">
              <CoffeeOutlined style={{ marginRight: "12px" }} />
              Recipes
            </div>
          </Link>
        </li>
        {authContext?.user ? (
          <>
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                onClick={() => {
                  authContext.logout();
                  setExpanded(false);
                }}
              >
                <div className="d-flex">
                  <LogoutOutlined style={{ marginRight: "12px" }} />
                  Logout
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Popover
                content={authContext.user.username}
                trigger="hover"
                placement="bottom"
              >
                <Link
                  to="/profile"
                  className="nav-link"
                  onClick={() => setExpanded(false)}
                >
                  <Avatar src={authContext.user.image} size={36} />
                </Link>
              </Popover>
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
                <div className="d-flex">
                  <UserAddOutlined style={{ marginRight: "12px" }} />
                  Register
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                <div className="d-flex">
                  <LoginOutlined style={{ marginRight: "12px" }} />
                  Login
                </div>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
