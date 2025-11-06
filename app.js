import React, { useState, useEffect } from "react";

const apiKey = "192d470a0655b5b0176cbc2311860bfe";

export default function WeatherApp() {
  const [city, setCity] = useState("Bangalore");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  async function fetchWeather(cityName) {
    try {
      setError(null);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      setCity(cityName);
      setQuery("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && query.trim() !== "") {
      fetchWeather(query.trim());
    }
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: "auto", padding: 20, background: "#222", color: "#eee", borderRadius: 10 }}>
      <div className="search" style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter city name"
          spellCheck="false"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ padding: 10, fontSize: 16, borderRadius: 5, width: "70%" }}
        />
        <button
          onClick={() => {
            if (query.trim() !== "") fetchWeather(query.trim());
          }}
          style={{ padding: "10px 15px", marginLeft: 10, fontSize: 16, borderRadius: 5, cursor: "pointer" }}
        >
          Search
        </button>
      </div>

      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

      {weather && (
        <div className="weather" style={{ textAlign: "center" }}>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            width="150"
            height="150"
          />
          <h1 className="temp" style={{ fontSize: "3rem", margin: "10px 0" }}>
            {Math.round(weather.main.temp)}°C
          </h1>
          <h2 className="city" style={{ fontWeight: "normal", marginBottom: 20 }}>
            {weather.name}
          </h2>

          <div className="details" style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="col" style={{ textAlign: "center" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/514/514267.png"
                alt="humidity"
                width="40"
                height="40"
              />
              <div className="humidity" style={{ fontSize: 18 }}>{weather.main.humidity}%</div>
              <p>Humidity</p>
            </div>
            <div className="col" style={{ textAlign: "center" }}>
              <img
                src="data:image/svg+xml;utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='40'%20height='40'%20fill='%23ffffff'%20viewBox='0%200%2024%2024'%3E%3Cpath%20d='M4%2010h9a3%203%200%201%200-3-3h-2a5%205%200%201%201%205%205H4v-2zm0%204h13a2%202%200%201%201-2%202h-2a4%204%200%201%200%204-4H4v2zm0%204h6a1%201%200%201%201-1%201H7a3%203%200%201%200%203-3H4v2z'/%3E%3C/svg%3E'
                alt="Wind Speed Icon"
              />
              <div className="wind" style={{ fontSize: 18 }}>{weather.wind.speed} Km/h</div>
              <p>Wind speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


