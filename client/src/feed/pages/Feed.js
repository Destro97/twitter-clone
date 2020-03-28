import React, { Component } from "react";

import AddTweet from "../components/AddTweet";
import TweetList from "../components/TweetList";
import { fetchFeed } from "../api";

export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      showAddTweetForm: false,
      tweets: []
    };
  }

  async componentDidMount() {
    const response = await fetchFeed();
    if (response.body.payload && response.body.payload.tweets) {
      this.setState({
        tweets: response.body.payload.tweets
      });
    }
  }

  tweetButtonToggle = () => {
    this.setState({ showAddTweetForm: !this.state.showAddTweetForm });
  };

  addTweetButton() {
    return (
      <div className="container">
        <br />
        <button
          onClick={this.tweetButtonToggle}
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
        {this.state.showAddTweetForm ? (
          <AddTweet clickCancel={this.tweetButtonToggle} />
        ) : (
          this.addTweetButton()
        )}
        <TweetList tweets={this.state.tweets} />
      </div>
    );
  }
}
