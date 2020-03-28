import React from "react";
import { Link, withRouter } from "react-router-dom";

import SearchBar from "./user/components/SearchBar";
import { logout, isAuthenticated } from "./auth/api";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#0275d8" };
  else return { color: "#ffffff" };
};

const Navbar = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>
      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/login")}
              to="/login"
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Signup
            </Link>
          </li>
        </>
      )}
      {isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/users")}
              to="/users"
            >
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/feed")}
              to="/feed"
            >
              Feed
            </Link>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#fff" }}
              onClick={() => logout(() => history.push("/"))}
            >
              Logout
            </span>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, `/user/${isAuthenticated().user.id}`)}
              to={
                isAuthenticated().user.id
                  ? `/user/${isAuthenticated().user.id}`
                  : `/user/${isAuthenticated().user._id}`
              }
            >
              {`${isAuthenticated().user.handle}'s Profile`}
            </Link>
          </li>
        </>
      )}
      <SearchBar />
    </ul>
  </div>
);

export default withRouter(Navbar);
