import { isAuthenticated } from "../auth/api";

export const fetchFeed = async () => {
  const token = isAuthenticated().token;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/feed`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`
    }
  });
  return {
    status: response.status,
    body: await response.json()
  };
};

export const postTweet = async text => {
  const token = isAuthenticated().token;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/tweets`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
    body: JSON.stringify({ text })
  });
  return {
    status: response.status,
    body: await response.json()
  };
};
