const getWeatherData = (location) => {
  const loading = document.getElementById("loading");
  loading.style.display = "block";

  const apiKey = "b30c7181e2754dd9b1c51355232305";
  const url = `https://api.weatherapi.com/v1/current.json?q=${location}&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => handleWeatherData(data))
    .catch((error) => {
      console.log("Error:", error);
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

const handleWeatherData = (data) => {
  if (data.error) {
    displayError(data.error.message);
  } else {
    const processedData = processData(data);
    displayWeatherInfo(processedData);
  }
}

const processData = (data) => {
  return {
    location: data.location.name,
    temperature: data.current.temp_c,
    description: data.current.condition.text,
    humidity: data.current.humidity,
  };
}

const form = document.getElementById("weather-form");
const locationInput = document.getElementById("location-input");
const weatherInfo = document.getElementById("weather-info");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = locationInput.value;
  getWeatherData(location);
  locationInput.value = "";
});

const displayWeatherInfo = (data) => {
  weatherInfo.innerHTML = `
      <h2>${data.location}</h2>
      <p>Temperature: ${data.temperature}°C</p>
      <p>Description: ${data.description}</p>
      <p>Humidity: ${data.humidity}%</p>
    `;
  weatherInfo.style.display = "block";
}

const displayError = (message) => {
  weatherInfo.innerHTML = `<p class="error">${message}</p>`;
  weatherInfo.style.display = "block";
}
