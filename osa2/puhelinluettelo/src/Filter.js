import React from "react";

export default function Filter(props) {
  return (
    <>
      filter shown with
      <input
        type="text"
        value={props.search}
        onChange={props.handleSearchChange}
      />
    </>
  );
}
