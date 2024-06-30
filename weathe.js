const API_KEY = "d78a0447dfff5b7709c02b184865d0fd";
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".inputBox");
const searchBtn = document.querySelector(".searchBtn");
const conditionImag = document.querySelector(".conditionImag");
const temparature = document.querySelector(".temparature");
const condition = document.querySelector(".condition");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");
const error = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(API_URL + city + `&appid=${API_KEY}`);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  const data = await response.json();

  conditionImag.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  temparature.innerHTML = `${Math.round(data.main.temp)}°C`;
  condition.innerHTML = data.weather[0].description;
  humidity.innerHTML = `Humidity : ${data.main.humidity}%`;
  windSpeed.innerHTML = `Wind Speed : ${data.wind.speed} km/h`;
  error.style.display = "none";
}

searchBtn.addEventListener("click", () => {
  const query = searchBox.value.trim();
  if (!query) {
    error.style.display = "block";
    error.innerHTML = "Enter Location";
  } else {
    checkWeather(query).catch(() => {
      error.style.display = "block";
      error.innerHTML = "Location not matched";
    });
  }
});
