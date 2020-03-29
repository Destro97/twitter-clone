import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import UsersList from "../components/UsersList";
import { searchUsers, followUser, unfollowUser } from "../api";

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
      this.setState({
        users: response.body.users || [],
        found: true
      });
    }
    return response;
  }

  async componentDidMount() {
    const search = this.props.location.search.slice(1);
    await this.fetchUsers(search);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const search = this.props.location.search.slice(1);
      await this.fetchUsers(search);
    }
  }

  followUser = async id => {
    await followUser(id);
    const search = this.props.location.search.slice(1);
    await this.fetchUsers(search);
  };

  unfollowUser = async id => {
    await unfollowUser(id);
    const search = this.props.location.search.slice(1);
    await this.fetchUsers(search);
  };

  render() {
    return (
      <UsersList
        followUser={this.followUser}
        unfollowUser={this.unfollowUser}
        users={this.state.users}
      />
    );
  }
}

export default withRouter(SearchResult);
