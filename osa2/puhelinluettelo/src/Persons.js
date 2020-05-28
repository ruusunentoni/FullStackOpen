import React from "react";

export default function Persons({ searchResults }) {
  return (
    <>
      {searchResults.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
}
