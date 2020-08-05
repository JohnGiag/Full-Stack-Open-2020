import React from "react";

const WeatherInfo = ({ weather }) => {
  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>

      <p> temperature: {weather.current.temperature} Celcius</p>
      <img src={weather.current.weather_icons[0]} alt="weather icon" />   
      <p>
        wind: {weather.current.wind_speed} kmh with direction {weather.current.wind_dir}
      </p>
    </div>
  );
};

export default WeatherInfo;
