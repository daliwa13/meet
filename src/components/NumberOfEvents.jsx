// Compontent to set the number of events to be shown
import React from 'react';
import { useState } from 'react';

const NumberOfEvents = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleChange = (e) => {
    const stringValue = e.target.value

    if (stringValue === "") {
      setNumberOfEvents("");  // Allow the input to be temporarily empty while the user is typing
      return;
    }
    const numValue = parseInt(stringValue); // Convert the string input to a number

    if (isNaN(numValue)) {
      setNumberOfEvents("");  // If the input is not a valid number, reset it to an empty string
      return;
    }

    if (numValue < 1) {
      setNumberOfEvents(1);  // Force minimum value of 1
      return;
    }

    setNumberOfEvents(numValue);  // Update the state with the valid number input
  };

  return (
    <div className="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events:</label>
      <input
        type="number"
        id="number-of-events-input"
        className="number-of-events-input"
        min="1"
        value={numberOfEvents}
        onChange={handleChange}
      />
    </div>
  );
}

export default NumberOfEvents;