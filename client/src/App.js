import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import "./App.css";
import Navbar from "./Navbar";
import Users from "./user/pages/Users";
import UserProfile from "./user/pages/UserProfile";
import Feed from "./feed/pages/Feed";
import Signup from "./auth/pages/Signup";
import Login from "./auth/pages/Login";
import SearchResult from "./user/pages/SearchResult";
import googleLoginMiddleware from "./auth/pages/googleLoginMiddleware";

const App = props => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <div className="container">
            <div
              className="jumbotron"
              style={{
                textAlign: "center",
                fontSize: "65px",
                color: "#0275d8"
              }}
            >
              <b>Welcome to Twitter Clone</b>
            </div>
          </div>
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route
          exact
          path="/auth/google/callback"
          component={googleLoginMiddleware}
        ></Route>
        <Route path="/search" exact>
          <SearchResult />
        </Route>
        <Route path="/Feed" exact>
          <Feed />
        </Route>
        <Route exact path="/user/:id" component={UserProfile}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </Router>
  );
};

export default App;
