import { OPEN_WEATHER } from "./open-weather-config.js";
import axios from "axios";

const getWeather = async point => {
  const url = `${OPEN_WEATHER.url}lat=${point.lat}&lon=${point.lon}&units=metric&APIKEY=${OPEN_WEATHER.APIKEY}`;
  const res = await axios.get(url);
  const weather = _extractWeatherData(res.data);
  return weather;
};

function _extractWeatherData(data) {
  var weather = {
    temp: data.main.temp,
    conditionName: data.weather[0].main,
    conditionIcon: _weatherIcon(data.weather[0].icon)
  };
  return weather;
}

function _weatherIcon(weatherIcon) {
  var icon;

  switch (weatherIcon) {
    case "01d":
      icon = "wi-day-sunny";
      break;
    case "01n":
      icon = "wi-night-clear";
      break;
    case "02d":
      icon = "wi-day-sunny-overcast";
      break;
    case "02n":
      icon = "wi-night-partly-cloudy";
      break;
    case "03d":
      icon = "wi-day-cloudy-high";
      break;
    case "03n":
      icon = "wi-night-cloudy-high";
      break;
    case "04d":
      icon = "wi-day-cloudy";
      break;
    case "04n":
      icon = "wi-night-cloudy";
      break;
    case "09d":
      icon = "wi-day-showers";
      break;
    case "09n":
      icon = "wi-night-showers";
      break;
    case "10d":
      icon = "wi-day-rain";
      break;
    case "10n":
      icon = "wi-night-rain";
      break;
    case "11d":
      icon = "wi-day-thunderstorm";
      break;
    case "11n":
      icon = "wi-night-thunderstorm";
      break;
    case "13d":
      icon = "wi-day-snow";
      break;
    case "13n":
      icon = "wi-night-snow";
      break;
    case "50d":
      icon = "wi-day-fog";
      break;
    case "50n":
      icon = "wi-night-fog";
      break;
  }
  return icon;
}

export { getWeather };
