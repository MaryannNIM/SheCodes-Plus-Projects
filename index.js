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
  document.querySelector(`#city`).innerHTML = response.city;
  document.querySelector(`#temp`).innerHTML = Math.round(
    response.temperature.current
  );
  document.querySelector(`#humidity`).innerHTML = response.temperature.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(response.wind.speed);
  document.querySelector(`#pressure`).innerHTML = Math.round(
    response.temperature.pressure
  );
  document.querySelector(`#description`).innerHTML =
    response.condition.description;
  document.querySelector(`#currentDay`).innerHTML = formattedDate(
    response.time * 1000
  );
  let iconElement = document.querySelector(`#icon`);

  iconElement.setAttribute(
    `src`,
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.condition.icon}.png`
    //`http://openweathermap.org/img/wn/${response.condition.icon}@2x.png`
  );
  iconElement.setAttribute(`alt`, response.condition.icon);
}
function searchCity(city) {
  let apiKey = `3obc0706ab1e96840e34atf92dcb6445`;
  //let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=${units}`;
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherTemp);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "3obc0706ab1e96840e34atf92dcb6445";
  //let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let latitude = position.coordinates.latitude;
  let longitude = position.coordinates.longitude;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}
  //&lon=${longitude}&appid=${apiKey}&units=${units}`;

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
