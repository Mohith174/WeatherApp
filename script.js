const apiKey = "c32eb68a1a80c2593cff5f09a48ed4b0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon")

async function checkWeather(city) {
    const units = "imperial"; // For Fahrenheit temperature
    const url = `${apiUrl}?q=${city}&units=${units}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°f";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; 
        document.querySelector(".wind").innerHTML = data.wind.speed + " mi/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        } else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
        } else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png"
        } 

        document.querySelector(".weather").style.display = "block"

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Optional: Check weather for a default city on page load
// checkWeather("South Brunswick");