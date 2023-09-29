import React, { useState, useEffect } from 'react';
import './styles.css';

const WeatherApp = () => {
  const [cities] = useState(['London', 'New York', 'Tokyo','Pune','Mumbai','Solapur','Bengluru']);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '97d3451171604c322368b124dea692f5';

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSearch = () => {
    if (selectedCity) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => console.error('Error fetching weather data:', error));
    }
  };

  useEffect(() => {
    // Fetch weather data for the first city in the list by default
    if (cities.length > 0) {
      setSelectedCity(cities[0]);
    }
  }, [cities]);

  return (
    <div className='weather-app'>
      <h1>Weather App</h1>
      <select onChange={handleCityChange} value={selectedCity}>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <button onClick={handleSearch}>Get Weather</button>

      {weatherData && (
        <div>
          <h2>Weather for {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
