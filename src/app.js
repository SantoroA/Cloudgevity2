function formatWeekDay(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = days[now.getDay()];
  return weekDay;
}

function formatTime(now) {
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentHour}h${currentMinute}min`;
}

function search(city) {
  let apiKey = "2b3715c71ce846298a7fbee953bac1d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  axios
    .get(`${apiUrl}q=${city}&appid=${apiKey}&units=metric`)
    .then(formatWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#city-input").value;
  search(cityValue);
}

function fetchLondon(event) {
  event.preventDefault();
  let cityValue = "London";
  search(cityValue);
}
function fetchParis(event) {
  event.preventDefault();
  let cityValue = "Paris";
  search(cityValue);
}
function fetchRome(event) {
  event.preventDefault();
  let cityValue = "Rome";
  search(cityValue);
}
function fetchNewYork(event) {
  event.preventDefault();
  let cityValue = "New York";
  search(cityValue);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2b3715c71ce846298a7fbee953bac1d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(formatWeatherInfo);
}

function formatWeatherInfo(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector(
    "#current-city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temperature-element").innerHTML = celsiusTemperature;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(
    "#wind-speed"
  ).innerHTML = `${response.data.wind.speed}m/s`;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.remove("inactive");
  fahrenheitLink.classList.add("inactive");
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#temperature-element").innerHTML = Math.round(
    (celsiusTemperature * 9) / 5 + 32
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.remove("inactive");
}
function changeToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temperature-element").innerHTML = Math.round(
    celsiusTemperature
  );
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.remove("inactive");
  fahrenheitLink.classList.add("inactive");
}

let celsiusTemperature = null;

let date = new Date();
let weekDayHtml = document.querySelector("#week-day");
let currentTime = document.querySelector("#time");
currentTime.innerHTML = formatTime(date);
weekDayHtml.innerHTML = formatWeekDay(date);

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", handleSubmit);

let currCityButton = document.querySelector("#button-current-city");
currCityButton.addEventListener("click", getPosition);

let londonLink = document.querySelector("#london-link");
let parisLink = document.querySelector("#paris-link");
let romeLink = document.querySelector("#rome-link");
let newYorkLink = document.querySelector("#new-york-link");

londonLink.addEventListener("click", fetchLondon);
parisLink.addEventListener("click", fetchParis);
romeLink.addEventListener("click", fetchRome);
newYorkLink.addEventListener("click", fetchNewYork);

let fahrenheitLink = document.querySelector("#switch-to-fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);
let celsiusLink = document.querySelector("#switch-to-celsius");
celsiusLink.addEventListener("click", changeToCelsius);

search("London");
