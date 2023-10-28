function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]} ${hours} : ${minutes} : ${seconds}`;
}

function displayCurrentWeatherCondition(response) {
  document.querySelector("#place").innerHTML = response.data.location.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.current.temp_c
  );
  document.querySelector("#extra").innerHTML =
    "🔆 Condition = " +
    " " +
    response.data.current.condition.text +
    " 🤗 Feels like " +
    " " +
    response.data.current.feelslike_c +
    "°C" +
    " 💭 Cloudy = " +
    " " +
    response.data.current.cloud +
    " ⛅️🌫️ 💦 Humidity = " +
    " " +
    response.data.current.humidity +
    "% 🌬️💨 Wind = " +
    " " +
    response.data.current.wind_kph +
    " Km/h";
  console.log(response);
}

function search(event) {
  event.preventDefault();
  let apiKey = "292e7d8643a64a77bae173935232710";
  let place = document.querySelector("#space-place").value;
  let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${place}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeatherCondition);
}

function getLocation(event) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.querySelector("#place").innerHTML =
      "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  let apiKey = "292e7d8643a64a77bae173935232710";
  let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${position.coords.latitude},${position.coords.longitude}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeatherCondition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);

//previous week
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(temperature * 9) / 5 + 32;
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32) / 9) * 5;
}

//Feature 1
let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//Feature 2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//Feature 3
let temperatureElement = document.querySelector("#current-temperature");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);
