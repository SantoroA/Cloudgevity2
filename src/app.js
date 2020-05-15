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
  document.querySelector(
    "#current-city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temperature-element").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(
    "#wind-speed"
  ).innerHTML = `${response.data.wind.speed}m/s`;
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

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

search("London");
