# Meet app
Simple serverless, progressive web application (PWA) with React. Created using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.
In order to use the app you must have a Google account.
Availble online on Vite: https://meet-gilt-sigma.vercel.app/
## Used development approach
The app was developed using Test Driven Development (TDD) approach for all unit and integration tests for feature 1-3 and the test cases for user accptance and end-to-end testing were written with Behaviour Driven Development in mind.
While developing the app, CD and CI has been applied using Atatus.
![Screenshot from project's dashboard in Atatus](image.png)
## Tech Stack
- JavaScript ES6
- React
- AWS Lambda
- Google Calendar API
- OAuth2
### Secondary Tech Stack:
- Recharts
- PWA
- Jest
- Cucumber-Jest
- Puppeteer
## Installation
The app has been deployed online using Vercel, but it uses third party authorisation via Google with limited allowed email adresses. In order to get access to the deployed version contact the author.
The app can also be run locally, for that follow the instructions below: 
### Prerequisites

    Node.js and npm
    An AWS account
    Serverless Framework installed and configured with your AWS credentials.
    A Google Cloud Platform account to create API credentials.
### 1. Clone the Repository

```bash
git clone https://github.com/daliwa13/meet.git
cd meet
```

### 2. Set Up the Backend (`auth-server`)

The serverless backend handles the OAuth2 flow to securely obtain an access token from Google.

1.  Navigate to the `auth-server` directory:
    ```bash
    cd auth-server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `config.json` file in the `auth-server` directory and add your Google API credentials. You can obtain these from the [Google Cloud Console](https://console.cloud.google.com/). Ensure you have enabled the Google Calendar API.
    ```json
    {
      "CLIENT_ID": "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
      "CLIENT_SECRET": "YOUR_GOOGLE_CLIENT_SECRET",
      "CALENDAR_ID": "YOUR_GOOGLE_CALENDAR_ID@group.calendar.google.com"
    }
    ```
4.  In the Google Cloud Console, add your frontend's URL (e.g., `http://localhost:5173`) to the "Authorized JavaScript origins" and "Authorized redirect URIs" for your OAuth 2.0 Client ID.
5.  Deploy the serverless functions to your AWS account:
    ```bash
    sls deploy
    ```
6.  After deployment, the Serverless Framework will output your API endpoints. Note these down.

### 3. Set Up the Frontend

1.  Navigate back to the root project directory and install the frontend dependencies:
    ```bash
    cd ..
    npm install
    ```
2.  Update the API endpoint URLs in `src/api.js` to match the endpoints from your `sls deploy` output. Look for the `fetch` calls to `https://fpet8zsw47.execute-api.eu-central-1.amazonaws.com` and replace the base URL.

### 4. Run the Application

-   **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

-   **Run tests:**
    ```bash
    npm run test
## User Stories
### Feature 1: Filter Events by City
As a user,
I should be able to filter events by city
So that I can see a list of events taking place in that city.
### Feature 2: Show/Hide Event Details
As a user,
I should be able to show and hide event details,
so that I can read more about a particular event.
### Feature 3: Specify Number of Events
As a user,
I should be able to specify the number of displayed events
so that they fit my resolution and needs.
### Feature 4: Use the App When Offline
As a user,
I should be able to use the app when being offline,
so that I can access previously checked out events.
### Feature 5: Add an App Shortcut to the Home Screen
As a user,
I should be able to add an app shortcut to the home screen,
so that I can access the app quickly.
### Feature 6: Display Charts Visualizing Event Details
As a user,
I should be able to display charts visualizing event details,
so that I can have an easy to analyze representation of events’ popularity.

## Test Scenarios
### Feature 1
#### Scenario 1
When user hasn’t searched for a specific city, show upcoming events from all cities.
- Given user has not selected a city;
- When the user opens the app;
- Then the app displays events from all cities.
#### Scenario 2
User should see a list of suggestions when they search for a city.
- Given the main page is open;
- When the user starts typing in the city search input field;
- Then the user should receive a list of cities (suggestions) that match what they’ve typed.
#### Scenario 3
User can select a city from the suggested list.
- Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
- When the user selects a city (e.g., “Berlin, Germany”) from the list;
- Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.
### Feature 2
Show/Hide Event Details
#### Scenario 1
An event element is collapsed by default.
- Given user didn’t press any details’ button,
- When the user opens the app,
- Then all events show only basic information like event name and city.
### Scenario 2
User can expand an event to see details.
- Given events show only basic information
- When the user selects a particular event by pressing the show details button,
- Then the details information (hour, duration, cost, exact location) will be showed and the “show details button” is converted into “hide details button”
#### Scenario 3
User can collapse an event to hide details
- Given user opened details about an event,
- When the user clicks on the event or on the details’ button,
- Then the event will collapse, hiding the details of the event.
### Feature 3
Specify Number of Events
#### Scenario 1
When user hasn’t specified a number, 32 events are shown by default.
- Given user did not specify the number of events to display,
- When the app loads
- Then the app shows 32 events at start.
#### Scenario 2
User can change the number of events displayed.
- Given user loaded the app,
- When they change the preferred amount of displayed events from a list,
- Then the app displays a specified number of events.
### Feature 4
Use the App When Offline
#### Scenario 1
Show cached data when there’s no internet connection.
- Given the user opened the app before,
- When they open the app while not having internet access 
- Then the app displays cached data.
#### Scenario 2
Show error when user changes search settings (city, number of events).
- Given the user has used the app before,
- When they change search settings (city or number of events)
- Then the app displays an error and asks whether it should refresh the main page.
### Feature 5
Add an App Shortcut to the Home Screen
#### Scenario 1
User can install the meet app as a shortcut on their device home screen.
- Given the user already installed the app,
- When they create a shortcut,
- Then the shortcut opens the app no matter it’s location.
### Feature 6
Display Charts Visualizing Event Details
#### Scenario 1
Show a chart with the number of upcoming events in each city.
- Given the user chose a city,
- When they press the “chart button”,
- Then a pie chart with division into event types will be displayed.