import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import CountryList from "./components/CountryList";
import axios from "axios";

const App = () => {
  const [searchValue, setSeatchValue] = useState("");

  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handeSearchValue = (event) => {
    setSeatchValue(event.target.value);
    setCountriesToShow(
      countries.filter((country) =>
        country.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div>debug : {searchValue}</div>
      <Search value={searchValue} onChange={handeSearchValue} />
      <CountryList countries={countriesToShow} />
    </div>
  );
};

export default App;
