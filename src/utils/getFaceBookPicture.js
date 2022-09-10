function getFaceBookPicture(fbUserID) {
  return `https://graph.facebook.com/${fbUserID}/picture?type=large`;
}

export default getFaceBookPicture;
