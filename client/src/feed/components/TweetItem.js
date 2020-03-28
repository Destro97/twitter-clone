import React from "react";
// import { Link } from "react-router-dom";

const TweetItem = props => {
  const tweet = props.tweet;
  // return <div></div>;
  return (
    <>
      <div className="card">
        <div className="row">
          <img
            className="card-img-top"
            src={tweet.user.avatar}
            alt={tweet.user.handle}
            style={{
              marginTop: "10px",
              marginLeft: "30px",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              objectFit: "fill"
            }}
          />
          <h6
            style={{
              marginTop: "15px",
              marginLeft: "10px"
            }}
          >
            <b>{tweet.user.handle}</b>
          </h6>
        </div>
        <div className="card-body">
          {/* className="card-title" */}
          <p className="card-text" style={{ "font-size": "20px" }}>
            {tweet.text}
          </p>
          {/* <Link
            to={`/users/${tweet.user.handle}/tweets/${tweet.id}`}
            className="btn btn-raised btn-small btn-primary"
          >
            View Profile
          </Link> */}
        </div>
        <div className="card-footer">
          <small className="text-muted">
            Posted on{" "}
            {new Date(tweet.created).toLocaleString("en-GB", {
              dateStyle: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour12: true,
              timeStyle: "short"
            })}
          </small>
        </div>
      </div>
      <br />
    </>
  );
};

export default TweetItem;
