import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}&units=m`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
        setLoading(false);
      });
  }, [country.capital]);

  if (loading)
    return (
      <div>
        <div className="loader"></div>
        <div>Retrieving information for {country.name}...</div>
      </div>
    );
  else {
    return (
      <div>
        <h1>{country.name}</h1>

        <p>Capital: {country.capital}</p>

        <p>Population: {country.population}</p>

        <h2>Spoken languages</h2>
        <ul>
          {country.languages.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt="flag" />
        <WeatherInfo weather={weather} />
      </div>
    );
  }
};

export default CountryInfo;
