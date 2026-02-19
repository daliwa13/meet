import React from "react";

import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import mockData from "./mock-data";

const App = () => {
  return (
    <div className="App">
      <CitySearch />
      <EventList events={mockData} />
    </div>
  );
}

export default App;