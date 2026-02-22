import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppComponent;
  let EventListDOM;
  let EventListItems;

  test('An event element is collapsed by default', ({ given, when, then, and }) => {

    given('the user has opened the events page', () => {
      AppComponent = render(<App />);
    });

    when('the events are displayed', async () => {
      const AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then('each event element should be collapsed by default', () => {
      EventListItems.forEach(eventItem => {
        const detailsButton = within(eventItem).queryByRole('button');
        expect(detailsButton).toHaveTextContent('Show Details');
      });
    });

    and('the event details should not be visible', () => {
      EventListItems.forEach(eventItem => {
        const detailsSection = eventItem.querySelector('.event-details');
        expect(detailsSection).not.toBeInTheDocument();
      });
    });
  });


  test('User can expand an event to see details', ({ given, and, when, then }) => {
    let firstEvent;
    const user = userEvent.setup();

    given('the user has opened the events page', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);  // ADD THIS LINE
      });
      firstEvent = EventListItems[0];  // MOVE THIS OUTSIDE waitFor
    });

    and('an event element is collapsed', () => {
      const detailsSection = firstEvent.querySelector('.event-details');
      expect(detailsSection).not.toBeInTheDocument();
    });

    when('the user clicks on the "Show Details" button of an event', async () => {
      const button = within(firstEvent).queryByText('Show Details');
      await user.click(button);
    });

    then('the event details should be visible', () => {
      const detailsSection = firstEvent.querySelector('.event-details');
      expect(detailsSection).toBeInTheDocument();
    });
  });


  test('User can collapse an event to hide details', ({ given, and, when, then }) => {
    let firstEvent;
    const user = userEvent.setup();

    given('the user has opened the events page', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
      firstEvent = EventListItems[0];
    });

    and('the events are displayed', () => {
      expect(EventListItems.length).toBeGreaterThan(0);
    });

    and('an event element is expanded', async () => {
      const button = within(firstEvent).queryByText('Show Details');
      await user.click(button);
      expect(firstEvent.querySelector('.event-details')).toBeInTheDocument();
    });

    when('the user clicks on the "Hide Details" button of an event', async () => {
      const button = within(firstEvent).queryByText('Hide Details');
      await user.click(button);
    });

    then('the event details should not be visible', () => {
      const detailsSection = firstEvent.querySelector('.event-details');
      expect(detailsSection).not.toBeInTheDocument();
    });
  });

});