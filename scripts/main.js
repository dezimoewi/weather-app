const apiKey = 'd29245ff55eaa3256cf2ed3147d3a0f6'; 

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      alert("City not found!");
      return;
    }

    const data = await response.json();
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const weather = data.weather[0].main;

    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temperature').innerText = `${temp.toFixed(1)} °C`;
    document.getElementById('description').innerText = desc;
    document.getElementById('weatherCard').style.display = 'block';

    changeBackground(weather);
  } catch (error) {
    alert("Error fetching weather data.");
    console.error(error);
  }
}

function changeBackground(condition) {
  const body = document.body;

  const weatherThemes = {
    Clear: "#fceabb",
    Clouds: "#d7d2cc",
    Rain: "#a1c4fd",
    Snow: "#e0eafc",
    Thunderstorm: "#4b6cb7",
    Drizzle: "#cfd9df",
    Mist: "#d3cce3",
  };

  body.style.background = `linear-gradient(to bottom, ${
    weatherThemes[condition] || "#74ebd5"
  }, #ffffff)`;
}
