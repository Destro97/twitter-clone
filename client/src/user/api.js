import { isAuthenticated } from "../auth/api";

export const fetchUserData = async (userId, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );
  return {
    status: response.status,
    body: await response.json()
  };
};

export const listUsers = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: "GET"
  });
  return {
    status: response.status,
    body: await response.json()
  };
};

export const searchUsers = async search => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/search/handle?search=${search}`,
    {
      method: "GET"
    }
  );
  return {
    status: response.status,
    body: await response.json()
  };
};

export const followUser = async userId => {
  const token = isAuthenticated().token;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/${userId}/follow`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${token}`
      }
    }
  );
  return {
    status: response.status,
    body: await response.json()
  };
};

export const unfollowUser = async userId => {
  const token = isAuthenticated().token;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/${userId}/unfollow`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${token}`
      }
    }
  );
  return {
    status: response.status,
    body: await response.json()
  };
};

export const getTweetsOfAuthenticatedUser = async () => {
  const token = isAuthenticated().token;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/tweets`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${token}`
    }
  });
  return {
    status: response.status,
    body: await response.json()
  };
};

export const deleteTweet = async tweetId => {
  const token = isAuthenticated().token;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/tweets/${tweetId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `${token}`
      }
    }
  );
  return {
    status: response.status,
    body: await response.json()
  };
};
