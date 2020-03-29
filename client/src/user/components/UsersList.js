import React from "react";

import UserItem from "./UserItem";
import { isAuthenticated } from "../../auth/api";

const UsersList = props => {
  if (!props.users || props.users.length === 0)
    return (
      <div className="center">
        <h2>No users found</h2>
      </div>
    );
  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Users</h2>
      <div className="card-deck">
        {props.users.map(user => {
          const currUserId = isAuthenticated()["user"].id;
          let showFollow;
          let isCurrUser;
          if (user.id !== currUserId)
            showFollow = !(
              user.followers.filter(follower => follower.user.id === currUserId)
                .length > 0
            );
          else isCurrUser = true;
          return (
            <UserItem
              key={user.id}
              id={user.id}
              name={user.displayName}
              handle={user.handle}
              avatar={user.avatar}
              joined={user.created}
              isCurrUser={isCurrUser}
              showViewProfile={true}
              showFollow={showFollow}
              follow={props.followUser}
              unfollow={props.unfollowUser}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UsersList;
