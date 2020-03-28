export const signup = async body => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/email`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return {
    status: response.status,
    body: await response.json()
  };
};

export const authenticate = body => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(body));
    // next();
  }
};

export const login = async body => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return {
    status: response.status,
    body: await response.json()
  };
};

export const logout = async next => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
  // const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
  //   method: "GET"
  // });
  // const responseBody = await response.json();
  // if (response.status !== 200) console.error(responseBody.message);
  // else console.log(responseBody.message);
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;

  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  else return false;
};

export const fetchgoogleLoginUrl = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/google`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });
  const body = await response.json();
  return body.url;
};

export const fetchGoogleLoginData = async code => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/auth/google/callback`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    }
  );
  return {
    status: response.status,
    body: await response.json()
  };
};
