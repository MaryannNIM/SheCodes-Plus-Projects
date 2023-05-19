function dateTime(date) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    `Jan`,
    `Feb`,
    `Mar`,
    `Apr`,
    `May`,
    `Jun`,
    `Jul`,
    `Aug`,
    `Sep`,
    `Oct`,
    `Nov`,
    `Dec`,
  ];
  let month = months[now.getMonth()];
  let dates = now.getDate();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedDate = `${day}, ${month} ${dates} , ${hours}:${minutes}`;
  return formattedDate;
}

function showWeatherTemp(response) {
  document.querySelector(`#city`).innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  document.querySelector(`#temp`).innerHTML = Math.round(celsiusTemperature);

  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#pressure`).innerHTML = Math.round(
    response.data.main.pressure
  );
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector(`#icon`);

  iconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(`alt`, response.data.weather[0].description);
}
function searchCity(city) {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherTemp);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}
&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector(`#temp`);
  celsiuslink.classList.remove(`active`);
  fahrenheitlink.classList.add(`active`);
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector(`#temp`);
  celsiuslink.classList.add(`active`);
  fahrenheitlink.classList.remove(`active`);
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let date = document.querySelector(`#currentDay`);
date.innerHTML = dateTime(new Date());

let searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener(`submit`, submit);

let currentButton = document.querySelector(`#current-location-button`);
currentButton.addEventListener(`click`, getCurrentLocation);

let celsiuslink = document.querySelector(`#celsius-link`);
celsiuslink.addEventListener(`click`, showCelsiusTemperature);

let fahrenheitlink = document.querySelector(`#fahrenheit-link`);
fahrenheitlink.addEventListener(`click`, showFahrenheitTemperature);

searchCity("Abuja");
