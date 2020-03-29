import React, { Component } from "react";
// import { Link } from "react-router-dom";

import UserItem from "../components/UserItem";
import TweetList from "../../feed/components/TweetList";
import { getTweetsOfAuthenticatedUser, deleteTweet } from "../api";
import { isAuthenticated } from "../../auth/api";
// import EditUserHandle from "../components/EditUserHandle";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: isAuthenticated().user,
      tweets: [],
      showEditHandleButton: true,
      error: ""
    };
  }

  async fetchUsersTweets() {
    const response = await getTweetsOfAuthenticatedUser();
    if (response.status === 200) {
      this.setState({
        tweets: response.body.tweets || []
      });
    } else {
      this.setState({
        error: response.body.message || "No tweets to show"
      });
    }
    return response;
  }

  editHandleButtonToggle = () => {
    this.setState({
      showEditHandleButton: !this.state.showEditHandleButton
    });
  };

  async componentDidMount() {
    await this.fetchUsersTweets();
  }

  deleteTweet = async tweetId => {
    const response = await deleteTweet(tweetId);
    if (response.status === 200) {
      await this.fetchUsersTweets();
    }
    return response;
  };

  deleteTweetConfirm = async tweetId => {
    let answer = window.confirm(`Are you sure you want to delete this tweet?`);
    if (answer) {
      this.deleteTweet(tweetId);
    }
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <div className="row">
          <div className="col-md-6">
            <UserItem
              key={this.state.user.id || this.state.user._id}
              id={this.state.user.id || this.state.user._id}
              handle={this.state.user.displayName}
              avatar={this.state.user.avatar}
              joined={this.state.user.created}
              isCurrUser={true}
              showViewProfile={false}
              showFollow={false}
              follow={() => {}}
              unfollow={() => {}}
            />
          </div>
          {/* <div className="col-md-6">
            <div className="d-inline-block mt-2">
              {this.state.showEditHandleButton ? (
                <button
                  onClick={this.editHandleButtonToggle}
                  className="btn btn-raised btn-success"
                >
                  Edit Handle
                </button>
              ) : (
                <EditUserHandle
                  cancel={this.editHandleButtonToggle}
                  render={() => {}}
                />
              )}
            </div>
          </div> */}
        </div>
        <TweetList
          tweets={this.state.tweets}
          isCurrUser={true}
          error={this.state.error}
          deleteConfirm={this.deleteTweetConfirm}
        />
      </div>
    );
  }
}

export default UserProfile;
