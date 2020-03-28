import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { signup, authenticate, fetchgoogleLoginUrl } from "../api";
import SignupEmail from "../components/SignupEmail";
import SignupGoogle from "../components/SignupGoogle";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      handle: "",
      email: "",
      password: "",
      error: "",
      googleUrl: "",
      success: false
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
    const { firstName, lastName, handle, email, password } = this.state;
    const user = {
      firstName,
      lastName,
      handle,
      email,
      password
    };
    console.log(user);
    const response = await signup(user);
    if (response.status !== 200) {
      this.setState({
        error: response.body.message
      });
    } else {
      authenticate(response.body);
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
        <h2 className="mt-5 mb-5">Signup</h2>
        <SignupGoogle url={this.state.googleUrl} />
        <br></br>
        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>
        <p className="container">
          <b>OR</b>
        </p>
        <SignupEmail
          state={{ ...this.state }}
          changed={this.handleChange}
          submit={this.handleSubmit}
        />
      </div>
    );
  }
}
