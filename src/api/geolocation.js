/** Using Geolocation API (HTML5) */

const geolocation = () => {
  navigator.geolocation.getCurrentPosition(_returnPosition, _errorHandler);
};

const _returnPosition = position => {
  const lat = position.coords.lat;
  const lon = position.coords.lon;
  return { lon: lon, lat: lat };
};

const _errorHandler = error => {
  console.error(`Error cargando posición. ${error}`);
};

export { geolocation };
