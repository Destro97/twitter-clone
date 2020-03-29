import React, { Component } from "react";

import AddTweet from "../components/AddTweet";
import TweetList from "../components/TweetList";
import { fetchFeed } from "../api";

export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      showAddTweetForm: false,
      tweets: [],
      addTweetSuccess: false,
      error: ""
    };
  }

  async componentDidMount() {
    const response = await fetchFeed();
    if (response.body && response.body.tweets) {
      this.setState({
        tweets: response.body.tweets || []
      });
    } else {
      this.setState({
        error: response.body.message || "No tweets to show"
      });
    }
  }

  tweetButtonToggle = addTweetSuccess => {
    this.setState({
      showAddTweetForm: !this.state.showAddTweetForm,
      addTweetSuccess: addTweetSuccess
    });
  };

  addTweetButton() {
    return (
      <div className="container">
        <br />
        <button
          onClick={this.tweetButtonToggle.bind(this, false)}
          className="btn btn-raised btn-primary"
        >
          Add Tweet
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.addTweetSuccess ? (
          <div className="alert alert-success">Tweet posted successfully.</div>
        ) : null}
        {this.state.showAddTweetForm ? (
          <AddTweet clickCancel={this.tweetButtonToggle} />
        ) : (
          this.addTweetButton()
        )}
        <TweetList
          tweets={this.state.tweets}
          error={this.state.error}
          isCurrUser={false}
        />
      </div>
    );
  }
}
