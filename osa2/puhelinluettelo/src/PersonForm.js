import React from "react";

export default function PersonForm(props) {
  return (
    <form onSubmit={props.submitNewPerson}>
      <div>
        name:{" "}
        <input
          type="text"
          value={props.newName}
          onChange={props.handleNameChange}
        />
        <br />
        number:{" "}
        <input
          type="text"
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
