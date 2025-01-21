const apiKey = "e260aded38c48a318c5d58d8e50f90a5";
const WeatherForm = document.querySelector(".WeatherForm");
const CityInput = document.querySelector(".CityInput");
const Card = document.querySelector(".Card");

WeatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = CityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter A City");
    }

});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();

}

function displayWeatherInfo(data){
    const {name: city,
           main: {temp, humidity},
           weather: [{description, id}]} = data;

    Card.textContent = "";
    Card.display = "block";

    const DisplayCity = document.createElement("h1");
    const DisplayTemperature = document.createElement("p");
    const DisplayHumidity = document.createElement("p");
    const DisplayDescription = document.createElement("p");
    const DisplayEmoji = document.createElement("p");
    
    DisplayCity.textContent = city;
    DisplayTemperature.textContent = `${((temp - 273.15)* (9/5) + 32).toFixed(1)}°F`;
    DisplayHumidity.textContent = `Humidity: ${humidity}`;
    DisplayDescription.textContent = description;
    DisplayEmoji.textContent = getWeatherEmoji(id);

    DisplayCity.classList.add("DisplayCity")
    DisplayTemperature.classList.add("DisplayWeather")
    DisplayHumidity.classList.add("DisplayHumidity")
    DisplayDescription.classList.add("DisplayDescription")
    DisplayEmoji.classList.add("WeatherEmoji")

    Card.appendChild(DisplayCity);
    Card.appendChild(DisplayTemperature);
    Card.appendChild(DisplayHumidity);
    Card.appendChild(DisplayDescription);
    Card.appendChild(DisplayEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "⛈";
        case(weatherId >= 300 && weatherId < 400):
            return "🌧";
        case(weatherId >= 500 && weatherId < 600):
            return "🌧";
        case(weatherId >= 600 && weatherId < 700):
            return "❄";
        case(weatherId >= 700 && weatherId < 800):
            return "🌫";
        case(weatherId === 800):
            return "☀";
        case(weatherId > 800 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("DisplayError");

    Card.textContent = "";
    Card.style.display = "block";
    Card.appendChild(errorDisplay);
}