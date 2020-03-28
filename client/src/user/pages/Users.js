import React, { Component } from "react";

import UsersList from "../components/UsersList";
import { listUsers, followUser, unfollowUser } from "../api";

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      rerender: false
    };
  }

  async getUsers() {
    let users = [];
    const response = await listUsers();
    if (response.status === 200) users = response.body.payload.users;
    return users;
  }

  async updateUsersListUtil() {
    const users = await this.getUsers();
    this.setState({
      users: users
    });
  }

  async componentDidMount() {
    await this.updateUsersListUtil();
  }

  followUser = async id => {
    await followUser(id);
    await this.updateUsersListUtil();
  };

  unfollowUser = async id => {
    await unfollowUser(id);
    await this.updateUsersListUtil();
  };

  render() {
    return (
      <UsersList
        users={this.state.users}
        followUser={this.followUser}
        unfollowUser={this.unfollowUser}
      />
    );
  }
}
