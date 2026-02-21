import React, { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const eventTitle = event?.summary || "";
  const eventDate = event?.start?.dateTime ? new Date(event.start.dateTime).toString() : "";
  const eventLocation = event?.location || "";

  return (
    <li className="event">
      <h2>{eventTitle}</h2>
      <p>{eventDate}</p>
      <p>{eventLocation}</p>
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Hide Details" : "Show Details"}</button>
      
      {showDetails && (
        <div className="event-details">
          <h3>About Event:</h3>
          <p>{event?.description}</p>
          <p>Organizer: {event?.organizer?.email}</p>
          <a href={event?.htmlLink}>Add event to your calendar</a>
        </div>
      )}
    </li>
  );
}

export default Event;