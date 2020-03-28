import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import qs from "qs";

import { authenticate, fetchGoogleLoginData } from "../api";

class googleLoginMiddleware extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    const code = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).code;
    console.log(code);

    const response = await fetchGoogleLoginData(code);

    console.log(response);
    authenticate(response.body);
    this.setState({
      loading: false,
      success: true
    });
  }

  render() {
    if (this.state.success) {
      return <Redirect to="/feed"></Redirect>;
    }
    return (
      <div className="jumbotron text-center">
        <h2>Loading...</h2>
      </div>
    );
  }
}

export default googleLoginMiddleware;
