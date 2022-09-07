function getFaceBookOAuthURL() {
  const rootUrl = "https://www.facebook.com/v4.0/dialog/oauth";

  const options = {
    redirect_uri: process.env.VUE_APP_FACEBOOK_OAUTH_REDIRECT_URL,
    client_id: process.env.VUE_APP_FACEBOOK_CLIENT_ID,
    auth_type: "rerequest",
    response_type: "code",
    display: "popup",
    scope: ["email", "public_profile"].join(","),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}

export default getFaceBookOAuthURL;
