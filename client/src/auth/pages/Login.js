import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { login, authenticate, fetchgoogleLoginUrl } from "../api";
import LoginEmail from "../components/LoginEmail";
import SignupGoogle from "../components/SignupGoogle";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      success: false,
      googleUrl: "",
      loading: false
    };
  }

  setGoogleLoginUrl(url) {
    this.setState({ googleUrl: url });
  }

  async componentDidMount() {
    const url = await fetchgoogleLoginUrl();
    this.setGoogleLoginUrl(url);
  }

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value,
      error: ""
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    const response = await login(user);
    if (response.status !== 200) {
      this.setState({
        error: response.body.message,
        loading: false
      });
    } else {
      authenticate(response.body.payload);
      this.setState({
        success: true
      });
    }
  };

  render() {
    if (this.state.success) {
      return <Redirect to="/feed"></Redirect>;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Login</h2>
        <SignupGoogle url={this.state.googleUrl} />
        <br></br>
        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>
        {this.state.loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}
        <p className="container">
          <b>OR</b>
        </p>
        <LoginEmail
          state={{ ...this.state }}
          changed={this.handleChange}
          submit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Login;
