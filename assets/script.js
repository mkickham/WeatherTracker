const apiKey = '66cadb79792bf6bc3526551395b6909c';
const searchButton = document.querySelector('.search-btn');
const searchBar = document.querySelector('.search-input');
const weatherData = document.querySelector('.city-container');

function saveLocalStorage(city, data) {
    const key = `weather_data_${city}`;
    localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(city){
    const key = `weather_data_${city}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data): null;
}

searchButton.addEventListener('click', () => {
    const city = searchBar.value;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    fiveDayForcast(city);
    fetch(apiURL)
        .then(Response => Response.json())
        .then(data => {
            console.log(data)
            weatherData.innerHTML = `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${city}</h5>
              <p class="card-text">Temperature: ${data.main.temp}°F</p>
              <p class="card-text">humidity: ${data.main.humidity}</p>
              <p class="card-text">Wind Speed: ${data.wind.speed} MPH </p>
            </div>
            </div>`;
        })
        .catch(error => {
            console.error('Error fetching the weather data', error)
            weatherData.innerHTML = "The weather data you requested is not available, please check later";
        });
});

function fiveDayForcast(city){
    const apiTwo = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(apiTwo)
    .then(Response => Response.json())
    .then(data =>{
        console.log(data)
        console.log(data.list.length)
        for (var i = 0; i < data.list.length; i++) {
        weatherData.innerHTML = `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${city}</h5>
        <p class="card-text">Temperature: ${data.list[i].main.temp}°F</p>
        <p class="card-text">humidity: ${data.list[i].main.humidity}</p>
        <p class="card-text">Wind Speed: ${data.list[i].wind.speed} MPH </p>
      </div>`
    }
    })
}

window.addEventListener('load', () => {
    const city = searchBar.value;
    const data = getLocalStorage(city);
    if (data) { 
        weatherData.textContent = `The weather in ${city} is ${data.current.temp}°F and ${data.current.condition.text}.`;
    }
})