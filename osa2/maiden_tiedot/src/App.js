import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(
    "Too many matches, specify another filter"
  );

  const [weather, setWeather] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;

  // useEffect(() => {
  //   console.log("calling weather API...");
  //   axios
  //     .get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${"Helsinki"}&appid=${apiKey}`
  //     )
  //     .then((response) => {
  //       console.log("response fulfilled");
  //       setWeather(response.data);
  //       console.log("success 2 ");
  //     })
  //     .catch((error) => {
  //       console.log("error: ", error);
  //     });
  //   console.log("exiting...");
  // }, []);

  console.log("weather: ", weather);

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

  useEffect(() => {
    console.log("searchResults.length: ", searchResults);
    if (searchResults.length === 1) {
      console.log("calling weather API...");
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchResults[0].capital}&appid=${apiKey}`
        )
        .then((response) => {
          console.log("response fulfilled");
          setWeather(response.data);
          console.log("success 2 ");
          console.log(response.data.main.temp);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
      console.log("exiting...");
    }
  }, [searchResults, apiKey]);

  useEffect(() => {
    if (weather.length > 1) {
    }
  });

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
        {weather.main === undefined ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>Weather in {country.capital}</h2>
            <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              height="100px"
              alt="weather icon"
            />
            <p>
              wind {weather.wind.speed} m/s direction {weather.wind.deg} degrees
            </p>
          </>
        )}
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
      <button onClick={() => console.log(`${weather.weather[0].icon}.png`)}>
        searchResults
      </button>
    </div>
  );
}
