import { useState } from "react";
import "./WeatherCard.css";

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "6201a0ca294e47a86bc80b9334f91f6e";

  const getWeather = async () => {
    if (city.trim() === "") {
      setError("Enter city name");
      setWeather(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="weather-box">
        <h1>Weather App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={getWeather}>Search</button>
        </div>

        {loading && <p className="loading">Loading...</p>}

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <h3>{Math.round(weather.main.temp)}°C</h3>

            <p>{weather.weather[0].main}</p>

            <div className="details">
              <div>
                <span>Humidity</span>
                <p>{weather.main.humidity}%</p>
              </div>

              <div>
                <span>Wind</span>
                <p>{weather.wind.speed} km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;
