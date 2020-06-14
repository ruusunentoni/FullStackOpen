import React, { useState, useEffect } from "react";

import personService from "./services/contacts";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import NewPersonNotification from "./NewPersonNotification";
import ErrorMessage from "./ErrorMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newPersonMessage, setNewPersonMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((inititalPersons) => {
      setPersons(inititalPersons);
      setSearchResults(inititalPersons);
    });
  }, []);

  useEffect(() => {
    setSearchResults(persons);
  }, [persons]);

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

    let newPersonId = 1;
    persons.map((person) => {
      if (person.id === newPersonId) {
        newPersonId += 1;
      }
    });

    const personObject = {
      name: newName,
      number: newNumber,
      id: newPersonId,
    };

    const found = persons.some((person) => person.name === newName);
    if (!found) {
      setPersons(persons.concat(personObject));
      personService.create(personObject).then((returnedPersons) => {
        setPersons(persons.concat(personObject));

        setNewPersonMessage(`Added ${newName}`);
        setTimeout(() => {
          setNewPersonMessage(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      });

      console.log(persons);
      return;
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with  a new one?`
        )
      ) {
        const foundPerson = persons.find((person) => person.name === newName);
        const changedPerson = { ...foundPerson, number: newNumber };

        // console.log("foundPerson.id", foundPerson.id);
        // console.log("changedPerson", changedPerson);

        personService
          .updateContact(foundPerson.id, changedPerson)
          .then((returnedPersons) => {
            console.log("persons: ", persons);
            persons.map((person) => {
              console.log("foundPerson.id: ", foundPerson.id);
              console.log("person.id: ", person.id);
            });
            setPersons(
              persons.map((person) =>
                person.id !== foundPerson.id ? person : returnedPersons
              )
            );
          })
          .catch((err) => {
            // setPersons(persons.concat(personObject));
            console.log("error: ", err);

            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });

        setNewName("");
        setNewNumber("");
      }
    }
  };

  const deletePerson = (event) => {
    let id = Number(event.target.id) || Number(event.target.getAttribute("id"));

    persons.map((person) => {
      if (person.id === id) {
        if (window.confirm(`Delete ${person.name}?`)) {
          personService.deleteContact(id).then((returnedPersons) => {
            setPersons(persons.filter((person) => person.id !== id));
          });
        }
      }
    });
    return persons;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NewPersonNotification message={newPersonMessage} />
      <ErrorMessage message={errorMessage} />
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
