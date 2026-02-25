import React from "react";
import { useEffect, useState } from 'react';

import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from "./components/CityEventsChart";
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  useEffect(() => {
    let infoText;
    if (navigator.onLine) {
      infoText = "";
    } else {
      infoText = "You are currently offline. The events may not be up to date.";
    }
    setWarningAlert(infoText);
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const fiteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(fiteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents 
        numberOfEvents={currentNOE} 
        setNumberOfEvents={setCurrentNOE} 
        setErrorAlert={setErrorAlert}
      />
      <CityEventsChart events={events} allLocations={allLocations} />
      <EventList events={events} />
    </div>
  );
}

export default App;