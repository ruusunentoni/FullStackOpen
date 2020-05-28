import React, { useState } from "react";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import Filter from "./Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(persons);

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
      setNewName("");
      setNewNumber("");
      return;
    } else {
      return alert(`${newName} is already added to phonebook`);
    }
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
      <Persons searchResults={searchResults} />
    </div>
  );
};

export default App;
