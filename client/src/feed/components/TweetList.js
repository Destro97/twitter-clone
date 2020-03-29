import React from "react";

import TweetItem from "./TweetItem";

const TweetList = props => {
  if (props.tweets.length === 0)
    return (
      <div className="center">
        <h2 style={{ marginTop: "20px" }}>{props.error}</h2>
      </div>
    );
  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Tweets</h2>
      <div className="col">
        {props.tweets.map(tweet => {
          return (
            <TweetItem
              key={tweet.id || tweet._id}
              id={tweet.id || tweet._id}
              tweet={tweet}
              isCurrUser={props.isCurrUser}
              deleteConfirm={props.deleteConfirm}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TweetList;
