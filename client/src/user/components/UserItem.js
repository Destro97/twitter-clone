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
        <h5 className="card-title">{props.name}</h5>
        <p className="card-title">
          <b>Handle:</b> {props.handle}
        </p>
        <div className="row">
          {props.isCurrUser ? (
            <Link
              to={`/user/${props.id}`}
              className="btn btn-raised btn-small btn-primary"
              style={{ display: props.showViewProfile ? "" : "none" }}
            >
              View Profile
            </Link>
          ) : (
            <div>
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
          )}
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
