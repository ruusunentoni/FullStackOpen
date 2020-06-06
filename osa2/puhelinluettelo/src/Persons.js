import React, { Fragment } from "react";

export default function Persons({ searchResults, deletePerson }) {
  return (
    <>
      {searchResults.map((person, index) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button id={person.id} type="button" onClick={deletePerson}>
            delete
          </button>
        </p>
      ))}
    </>
  );
}
