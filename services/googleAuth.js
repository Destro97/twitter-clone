const { google } = require("googleapis");

const {
  googleClientID,
  googleClientSecret,
  googleClientRedirect
} = require("../config/keys");
const User = require("../models/User");

const googleConfig = {
  clientId: googleClientID,
  clientSecret: googleClientSecret,
  redirect: googleClientRedirect
};

const defaultScope = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
];

const googleAuthConnection = () => {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
};

const getConnectionUrl = auth => {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: defaultScope
  });
};

const getOAuth2Api = auth => {
  return google.oauth2({
    version: "v1",
    auth
  });
};

const urlGoogle = () => {
  const auth = googleAuthConnection();
  const url = getConnectionUrl(auth);
  return url;
};

const getGoogleAccountFromCode = async code => {
  const auth = googleAuthConnection();
  const data = await auth.getToken(code);
  const tokens = data.tokens;
  auth.setCredentials(tokens);
  const oauth2Client = getOAuth2Api(auth);
  const me = await oauth2Client.userinfo.get({
    auth
  });
  console.log(me.data);
  try {
    const user = new User({
      displayName: me.data.name,
      email: me.data.email,
      avatar: me.data.photo,
      googleID: me.data.id
    });
    const existingUser = await User.findOne({ googleID: user.id });
    if (existingUser) {
      return existingUser;
    }
    const savedUser = await user.save();
    return savedUser;
  } catch (err) {
    console.error("Error occured ${err}");
    return { err };
  }
};

module.exports = {
  urlGoogle,
  getGoogleAccountFromCode
};
