/** Using Geolocation API (HTML5) */

const getUserGeolocation = () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

export { getUserGeolocation };
