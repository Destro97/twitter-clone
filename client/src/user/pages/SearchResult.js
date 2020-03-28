import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import UsersList from "../components/UsersList";
import { searchUsers } from "../api";

class SearchResult extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      found: false
    };
  }

  async fetchUsers(search) {
    const response = await searchUsers(search);
    if (response.status === 200) {
      // if (response.body.payload && response.body.payload.users.length > 0)
      this.setState({
        users: response.body.users || [],
        found: true
      });
    }
    return response;
  }

  async componentDidMount() {
    // console.log(this.props);
    const search = this.props.location.search.slice(1);
    await this.fetchUsers(search);
  }

  async componentDidUpdate(prevProps) {
    console.log(prevProps);
    console.log(this.props);
    if (prevProps.location.search !== this.props.location.search) {
      const search = this.props.location.search.slice(1);
      await this.fetchUsers(search);
    }
  }

  render() {
    return <UsersList users={this.state.users} />;
  }
}

export default withRouter(SearchResult);
