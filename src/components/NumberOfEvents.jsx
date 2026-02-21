// Compontent to set the number of events to be shown
import React from 'react';
import { useState } from 'react';

const NumberOfEvents = ({ numberOfEvents, setNumberOfEvents }) => {
  const [query, setQuery] = useState("32"); // Local state to manage the input field value

  const handleChange = (e) => {
    const stringValue = e.target.value

    if (stringValue === "") {
      setNumberOfEvents("");  // Allow the input to be temporarily empty while the user is typing
      setQuery("");  // Update the local query state to reflect the empty input
      return;
    }
    const numValue = parseInt(stringValue); // Convert the string input to a number

    if (isNaN(numValue)) {
      setNumberOfEvents("");  // If the input is not a valid number, reset it to an empty string
      setQuery("");  // Update the local query state to reflect the invalid input
      return;
    }

    if (numValue < 1) {
      setNumberOfEvents(1);  // Force minimum value of 1
      setQuery("1");  // Update the local query state to reflect the minimum value
      return;
    }

    setNumberOfEvents(numValue);  // Update the state with the valid number input
    setQuery(numValue.toString());  // Update the local query state to reflect the valid input
  };

  return (
    <div className="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="number"
        id="number-of-events-input"
        className="number-of-events-input"
        min="1"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}

export default NumberOfEvents;