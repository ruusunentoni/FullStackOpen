import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(
    "Too many matches, specify another filter"
  );

  useEffect(() => {
    // console.log("getting data...");
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        // console.log("adding data to state...");
        setCountries(response.data);
        // setSearchResults(response.data);
        console.log("success!");
      })
      .catch((error) => {
        console.log("error was: ", error);
      });
  }, []);

  const showSingleCountry = (country) => {
    return (
      <div>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>languages:</h3>
        <ul>
          {country.languages.map((lang) => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <br />
        <img src={country.flag} height="100px" alt={country.name + " flag"} />
      </div>
    );
  };

  const handleSearch = (event) => {
    // console.log("event: ", event);
    // const value = event.target.value || event.target.getAttribute("value");
    const value = event.target.value;

    // if (value === undefined) {
    //   value = event;
    //   console.log('yeet')
    // }
    // const value = event;

    // console.log("value: ", value);
    setSearch(value);
    // setSearchResults(countries);
    let filteredCountries = countries.filter(function (country) {
      return country.name.toLowerCase().includes(search.toLowerCase());
    });
    // console.log("filteredCountries: ", filteredCountries);

    setSearchResults(filteredCountries);
  };

  const countyButton = (country) => {
    // console.log("country: ", country);
    setSearch(country.name.toLowerCase());
    setSearchResults([country]);
    // console.log("event: ", event);
    // event.preventDefault();
    // setSearchResults([country]);
    // console.log("[country]: ", [country]);
    // handleSearch(event);
  };

  return (
    <div>
      find countries
      <input type="text" value={search} onChange={handleSearch} autoFocus />
      <ul>
        {searchResults.length > 10
          ? "Too many matches, specify another filter"
          : searchResults.length === 1
          ? showSingleCountry(searchResults[0])
          : searchResults.map((country) => {
              return (
                <li key={country.name} name={country.name} value={country.name}>
                  {country.name}{" "}
                  <button
                    value={country.name}
                    // onClick={() => setSearchResults([country])}
                    onClick={() => countyButton(country)}
                    // onClick={() => setSearch(country.name)}
                    // // onClick={() => console.log(country.name)}
                  >
                    show
                  </button>
                </li>
              );
            })}
      </ul>
      {/* <button onClick={() => console.log(searchResults)}>searchResults</button> */}
    </div>
  );
}
