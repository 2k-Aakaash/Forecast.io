const API_KEY = "468a774e2943d6f9057400c7fb4ff08b";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;

const getButton = document.getElementById("getButton");
const city = document.getElementById("cityname");
const temp1 = document.getElementById("temp");
const desc1 = document.getElementById("description");

// Function to fetch weather data based on user's precise location
const fetchWeatherByGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        alert("Geolocation is not supported by this browser. Please enter a city name.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser. Please enter a city name.");
  }
};

// Function to fetch weather data by coordinates
const fetchWeatherByCoords = (latitude, longitude) => {
  const URL = `${API_URL}&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
};

// Function to display weather data on the page
const displayWeather = (data) => {
  const tempCelsius = Math.floor(data.main.temp - 273.15);
  const tempFahrenheit = Math.floor((tempCelsius * 9/5) + 32); // Convert Celsius to Fahrenheit
  temp1.innerText = `${tempCelsius}°C / ${tempFahrenheit}°F`;
  const desc = data.weather[0].main;
  desc1.innerText = desc;
  city.innerText = data.name;
};


// Fetch weather based on precise location when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherByGeolocation();
});

// Event listener for the "Get Weather" button
getButton.addEventListener("click", () => {
  fetchDataByCity();
});

// Function to fetch weather data by city name
const fetchDataByCity = () => {
  const cityInput = document.getElementById("input-bar").value;
  const URL = `${API_URL}${cityInput}&appid=${API_KEY}`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
};

// Event listener for pressing Enter key in the input field
document.getElementById("input-bar").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchDataByCity();
  }
});


// Initialize tilt effect
VanillaTilt.init(document.querySelector(".container"), {
  reverse:                false,
  max:                    2,  
  startX:                 0,
  startY:                 0,
  perspective:            700,
  scale:                  1.02,
  speed:                  500,
  transition:             true,
  axis:                   null,
  reset:                  true,
  "reset-to-start":       true,
  easing:                 "cubic-bezier(.03,.98,.52,.99)",
  glare:                  true,
  "max-glare":            0.4, 
  "glare-prerender":      false,
  "mouse-event-element":  null,
  gyroscope:              true,   
  gyroscopeMinAngleX:     -45,
  gyroscopeMaxAngleX:     45, 
  gyroscopeMinAngleY:     -45,
  gyroscopeMaxAngleY:     45
});

// Check if the browser supports DeviceOrientation API
if (window.DeviceOrientationEvent) {
  // Request permission to access motion sensors
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          enableGyroscopeTilt();
        }
      })
      .catch(console.error);
  } else {
    // Permission already granted or not needed
    enableGyroscopeTilt();
  }
} else {
  // DeviceOrientation API not supported
  console.error('DeviceOrientation API not supported');
}

// Function to enable gyroscope tilt effect
function enableGyroscopeTilt() {
  VanillaTilt.init(document.querySelector(".container"), {
    // Other options...
    gyroscope: true,
    gyroscopeMinAngleX: -105,
    gyroscopeMaxAngleX: 200, 
    gyroscopeMinAngleY: -105,
    gyroscopeMaxAngleY: 200
  });
}
