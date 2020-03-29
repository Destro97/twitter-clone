import React, { Component } from "react";
// import { Link } from "react-router-dom";

// import { editHandle } from "../api";

export default class EditUserHandle extends Component {
  constructor(props) {
    super();
    this.state = {
      render: props.render,
      text: "",
      error: ""
    };
  }

  handleChange = event => {
    this.setState({
      text: event.target.value,
      error: ""
    });
  };

  handleSubmit = async () => {
    // const response = await editHandle(this.state.text);
    // if (response.status !== 200) {
    //   this.state.render();
    // }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <br />
          {/* <div className="card"> */}
          {this.state.error ? (
            <div className="alert alert-danger">{this.state.error}</div>
          ) : null}
          <form>
            <div className="form-group">
              <label className="text-muted">Handle</label>
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control"
                // value={props.state.handle}
              />
            </div>
          </form>
        </div>
        <div>
          <div className="row">
            <button
              onClick={this.props.cancel}
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
    );
  }
}
