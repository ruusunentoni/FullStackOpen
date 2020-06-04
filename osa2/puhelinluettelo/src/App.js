import React, { useState, useEffect } from "react";
// import axios from "axios";

import Persons from "./Persons";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import personService from "./services/contacts";

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456" },
  //   { name: "Ada Lovelace", number: "39-44-5323523" },
  //   { name: "Dan Abramov", number: "12-43-234345" },
  //   { name: "Mary Poppendieck", number: "39-23-6423122" },
  // ]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((inititalPersons) => {
      setPersons(inititalPersons);
      setSearchResults(inititalPersons);
    });
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   console.log("response fulfilled");
    //   setPersons(response.data);
    //   setSearchResults(response.data);
    // });
  }, []);

  // console.log("persons: ", persons);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);

    let filteredPersons = persons.filter(function (person) {
      return person.name.toLowerCase().includes(search.toLowerCase());
    });
    setSearchResults(filteredPersons);
  };

  const submitNewPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const found = persons.some((person) => person.name === newName);
    if (!found) {
      setPersons(persons.concat(personObject));
      personService.create(personObject).then((returnedPersons) => {
        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
      });

      return;
    } else {
      return alert(`${newName} is already added to phonebook`);
    }
  };

  const deletePerson = (event) => {
    const name = event.target.key || event.target.getAttribute("key");
    console.log("name: ", name);
    // personService.deleteContact(name).then((returnedPersons) => {
    //   setPersons(persons.filter((person) => person.name !== name));
    // });
    // console.log(persons);
    // return;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        submitNewPerson={submitNewPerson}
      />
      <h3>Numbers</h3>
      <Persons searchResults={searchResults} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
