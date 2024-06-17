/** Using Geolocation API (HTML5) */

const getUserGeolocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export { getUserGeolocation };
