import React from "react";
import { Link } from "react-router-dom";

const UserItem = props => {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={props.avatar}
        alt={props.handle}
        style={{
          width: "100%",
          height: "12vw",
          borderTop: "10px solid #fff",
          objectFit: "contain"
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.handle}</h5>
      </div>
      {/* <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div> */}
      {/* <ul className="list-group list-group-flush">
        <li className="list-group-item">Handle: {props.handle}</li>
      </ul> */}
      <div className="card-body">
        <div className="row">
          <Link
            to={`/users/${props.id}`}
            className="btn btn-raised btn-small btn-primary"
          >
            View Profile
          </Link>
          <div style={{ display: props.isCurrUser ? "none" : "" }}>
            <button
              className="btn btn-raised btn-primary"
              style={{ display: props.showFollow ? "" : "none" }}
              onClick={props.follow.bind(this, props.id)}
            >
              Follow
            </button>
            <button
              className="btn btn-raised btn-primary"
              style={{ display: props.showFollow ? "none" : "" }}
              onClick={props.unfollow.bind(this, props.id)}
            >
              Unfollow
            </button>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <small className="text-muted">
          Member since {new Date(props.joined).toDateString()}
        </small>
      </div>
    </div>
  );
};

export default UserItem;
