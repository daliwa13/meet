# Meet app
Simple serverless, progressive web application (PWA) with React. Created using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.  
Availble online on Vite: https://meet-gilt-sigma.vercel.app/
## Tech Stack
- JavaScript ES6
- React
- Google Calendar API
- OAuth2 
# User Stories
## Feature 1: Filter Events by City
As a user,
I should be able to filter events by city
So that I can see a list of events taking place in that city.
## Feature 2: Show/Hide Event Details
As a user,
I should be able to show and hide event details,
so that I can read more about a particular event.
## Feature 3: Specify Number of Events
As a user,
I should be able to specify the number of displayed events
so that they fit my resolution and needs.
## Feature 4: Use the App When Offline
As a user,
I should be able to use the app when being offline,
so that I can access previously checked out events.
## Feature 5: Add an App Shortcut to the Home Screen
As a user,
I should be able to add an app shortcut to the home screen,
so that I can access the app quickly.
## Feature 6: Display Charts Visualizing Event Details
As a user,
I should be able to display charts visualizing event details,
so that I can have an easy to analyze representation of events’ popularity.

# Test Scenarios
## Feature 1
### Scenario 1
When user hasn’t searched for a specific city, show upcoming events from all cities.
- Given user has not selected a city;
- When the user opens the app;
- Then the app displays events from all cities.
### Scenario 2
User should see a list of suggestions when they search for a city.
- Given the main page is open;
- When the user starts typing in the city search input field;
- Then the user should receive a list of cities (suggestions) that match what they’ve typed.
### Scenario 3
User can select a city from the suggested list.
- Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
- When the user selects a city (e.g., “Berlin, Germany”) from the list;
- Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.
## Feature 2
Show/Hide Event Details
### Scenario 1
An event element is collapsed by default.
- Given user didn’t press any details’ button,
- When the user opens the app,
- Then all events show only basic information like event name and city.
## Scenario 2
User can expand an event to see details.
- Given events show only basic information
- When the user selects a particular event by pressing the show details button,
- Then the details information (hour, duration, cost, exact location) will be showed and the “show details button” is converted into “hide details button”
### Scenario 3
User can collapse an event to hide details
- Given user opened details about an event,
- When the user clicks on the event or on the details’ button,
- Then the event will collapse, hiding the details of the event.
## Feature 3
Specify Number of Events
### Scenario 1
When user hasn’t specified a number, 32 events are shown by default.
- Given user did not specify the number of events to display,
- When the app loads
- Then the app shows 32 events at start.
### Scenario 2
User can change the number of events displayed.
- Given user loaded the app,
- When they change the preferred amount of displayed events from a list,
- Then the app displays a specified number of events.
## Feature 4
Use the App When Offline
### Scenario 1
Show cached data when there’s no internet connection.
- Given the user opened the app before,
- When they open the app while not having internet access 
- Then the app displays cached data.
### Scenario 2
Show error when user changes search settings (city, number of events).
- Given the user has used the app before,
- When they change search settings (city or number of events)
- Then the app displays an error and asks whether it should refresh the main page.
## Feature 5
Add an App Shortcut to the Home Screen
### Scenario 1
User can install the meet app as a shortcut on their device home screen.
- Given the user already installed the app,
- When they create a shortcut,
- Then the shortcut opens the app no matter it’s location.
## Feature 6
Display Charts Visualizing Event Details
### Scenario 1
Show a chart with the number of upcoming events in each city.
- Given the user chose a city,
- When they press the “chart button”,
- Then a pie chart with division into event types will be displayed.
