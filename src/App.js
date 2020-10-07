import React, { useState } from "react";
import "./App.css";

const api = {
  base:
    "https://api.weatherapi.com/v1/current.json?key=6f3435eca3d64b24b40135728200610&q=",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}${query}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  return (
    <div className="App">
      <div className="appName">Weather App</div>
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {typeof weather.location != "undefined" &&
      typeof weather.current != "undefined" ? (
        <div>
          <div className="location-box">
            <div className="location">
              {weather["location"].name}, {weather["location"].region}
            </div>
            <div className="local-time">{weather["location"].localtime}</div>
          </div>
          <div className="current-box">
            <div className="current">
              {Math.round(weather["current"].temp_f)}°F
              <div className="skyDetails">
                {weather["current"]["condition"].text}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
