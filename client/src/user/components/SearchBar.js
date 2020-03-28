import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {};
    this.search = "";
  }

  handleChange = event => {
    this.search = event.target.value;
    this.setState({});
  };

  render() {
    return (
      <form className="form-inline my-2 my-lg-0 ml-auto">
        <input
          className="form-control mr-sm-2 bg-light"
          onChange={this.handleChange}
          value={this.search}
          type="search"
          placeholder=" Search users"
          aria-label="Search"
        />
        <Link to={{ pathname: "/search", search: this.search }}>
          <button className="btn btn-sm btn-primary my-2 my-sm-0">
            <span style={{ color: "white" }}>Search</span>
          </button>
        </Link>
      </form>
    );
  }
}

export default SearchBar;
