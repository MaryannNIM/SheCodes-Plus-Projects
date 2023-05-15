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

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedDate = `${day} ${hours}:${minutes}`;
  return formattedDate;
}

function showWeatherTemp(response) {
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#temp`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#pressure`).innerHTML = Math.round(
    response.data.main.pressure
  );
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].description;
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
let date = document.querySelector(`#currentDay`);
date.innerHTML = dateTime(new Date());

let searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener(`submit`, submit);

let currentButton = document.querySelector(`#current-location-button`);
currentButton.addEventListener(`click`, getCurrentLocation);
