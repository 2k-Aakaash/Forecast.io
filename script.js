const API_KEY = "468a774e2943d6f9057400c7fb4ff08b"
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=`

const weatherInput = document.getElementById("input-bar")
const getButton = document.getElementById("getButton")
const city = document.getElementById("cityname")
const temp1 = document.getElementById("temp")
const desc1 = document.getElementById("description")

getButton.addEventListener("click", () => {
  fetchData(weatherInput.value);
})

weatherInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      fetchData(weatherInput.value);
      // city.innerText = `${weatherInput.value}`
    }
  })

const fetchData = (location) => {
    const URL = `${API_URL}${location}&appid=${API_KEY}`
    fetch(URL)
    .then(response => response.json())
    .then(data => {
      const temp = Math.floor(data.main.temp - 273.15);
      temp1.innerText = temp + "°"
      const desc = data.weather[0].main;
      desc1.innerText = desc
      city.innerText = data.name;
      console.log(temp)
      console.log(desc)
      console.log(data)
    })

}

// fetchData()

