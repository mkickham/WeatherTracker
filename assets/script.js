const apiKey = '66cadb79792bf6bc3526551395b6909c';
const searchButton = document.querySelector('.search-btn');
const searchBar = document.querySelector('.search-input');
const weatherData = document.querySelector('.weather-data');

function saveLocalStorage(city, data) {
    const key = 'weather_data_${city}';
    localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(city){
    const key = 'weather_data_${city}';
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data): null;
}

searchBar.addEventListener('click', () => {
    const city = searchInput.value;
    const apiURL = 'https://api.weatherapi.com/v1/current.json?key=${66cadb79792bf6bc3526551395b6909c}';

    fetch(apiURL)
        .then(Response => Response.json())
        .then(data => {
            console.log(data)
            weatherData.textContent = 'the weather in ${city} is ${data.current.temp_F}°F and ${data.current.condition.text}.';
        })
        .catch(error => {
            console.error('Error fetching the weather data', error)
            weatherData.textContent = "The weather data you requested is not available, please check later";
        });
});

window.addEventListener('load', () => {
    const city = searchInput.value;
    const data = getLocalStorage(city);
    if (data) { 
        weatherData.textContent = 'The weather in ${city} is ${data.current.temp_F}°F and $data.current.condition.text}.';
    }
})