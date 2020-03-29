import React, { Component } from "react";

import { postTweet } from "../api";

export default class AddTweet extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      error: "",
      success: false
    };
  }

  handleChange = event => {
    this.setState({
      text: event.target.value,
      error: ""
    });
  };

  postTweet = async () => {
    const response = await postTweet(this.state.text);
    if (response.status !== 200) {
      this.setState({
        error: response.body.message
      });
    } else {
      this.setState({
        text: "",
        tweetId: response.body.tweet._id,
        success: true
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="col">
          <br />
          <div className="card">
            {this.state.error ? (
              <div className="alert alert-danger">{this.state.error}</div>
            ) : null}
            {this.state.success
              ? this.props.clickCancel(this.state.success)
              : null}
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>
                    <b>Enter text for your tweet</b>
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    onChange={this.handleChange}
                  ></textarea>
                </div>
              </form>
              <div className="row">
                <button
                  onClick={this.props.clickCancel.bind(
                    this,
                    this.state.success
                  )}
                  className="btn btn-raised btn-danger"
                >
                  Cancel
                </button>
                <button
                  onClick={this.postTweet}
                  className="btn btn-raised btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
