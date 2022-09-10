// get geolocation
async function getGeolocation() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

// get current position
async function getCurrentPosition() {
  try {
    let { coords } = await getGeolocation();
    return [coords.latitude, coords.longitude];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default getCurrentPosition;
