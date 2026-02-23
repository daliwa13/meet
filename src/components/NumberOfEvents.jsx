// Compontent to set the number of events to be shown
import React from 'react';
import { useState } from 'react';

const NumberOfEvents = ({ numberOfEvents, setNumberOfEvents, setErrorAlert }) => {
  const [query, setQuery] = useState("32"); // Local state to manage the input field value

  const handleChange = (e) => {
    const stringValue = e.target.value
    let infoText;

    const numValue = parseInt(stringValue); // Convert the string input to a number

    if (numValue < 1 || Number.isNaN(numValue)) {
      infoText = "Only possitive numbers are allowed. Please enter a valid number."
      setErrorAlert(infoText);
      setQuery("");  // Update the local query state to reflect the invalid input
      setNumberOfEvents("");  // Clear the number of events in the parent state to prevent displaying events when input is invalid
      return;
    }
    
    infoText = "";
    setErrorAlert(infoText);
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