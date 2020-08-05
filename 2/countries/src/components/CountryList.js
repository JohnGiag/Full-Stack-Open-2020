import React from "react";
import CountryInfo from "./CountryInfo";

const CountryList = ({ countries }) => {
  if (countries.length === 0) return <div>0 matches found</div>;
  else if(countries.length===1){
      return(
        <CountryInfo key={countries[0].name} country={countries[0]} />
      )
  }
  else if (countries.length > 20) {
    return <div>Please narrow your search</div>;
  } else {
    return (
      <div>
        <ul>
          {countries.map((country) => (
            <li key={country.name}>{country.name}</li> 
          ))}
        </ul>
      </div>
    );
  }
};
export default CountryList;
