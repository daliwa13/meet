import React from "react";

import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import mockData from "./mock-data";

const App = () => {
  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents />
      <EventList events={mockData} />
    </div>
  );
}

export default App;