import React from "react";

const NewPersonNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};

export default NewPersonNotification;
