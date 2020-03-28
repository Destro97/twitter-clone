import React, { Component } from "react";
import { Link } from "react-router-dom";

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
            <div
              className="alert alert-danger"
              style={{ display: this.state.error ? "" : "none" }}
            >
              {this.state.error}
            </div>
            <div
              className="alert alert-success"
              style={{ display: this.state.success ? "" : "none" }}
            >
              Tweet posted successfully.
              <Link to={`/tweets/${this.state.tweetId}`}> Open tweet.</Link>
            </div>
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
                  onClick={this.props.clickCancel}
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
