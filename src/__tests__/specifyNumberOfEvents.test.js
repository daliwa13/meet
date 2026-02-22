import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppComponent;
  let AppDOM;
  let EventListDOM;

  test('When user hasn’t specified a number, 32 events are shown by default', ({ given, when, and, then }) => {

    given('the user has opened the events page', () => {
      AppComponent = render(<App />);
    });

    when('the events are displayed', async () => {
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    and('the user has not specified a number of events', () => {
      // No interaction needed — default behavior
    });

    then('32 events should be displayed', async () => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems).toHaveLength(32);
      });
    });
  });


  test('User can change the number of events displayed', ({ given, and, when, then }) => {
    let numberInput;
    const user = userEvent.setup();

    given('the user has opened the events page', () => {
      AppComponent = render(<App />);
    });

    and('the events are displayed', async () => {
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    when('the user changes the number of events to 10', async () => {
      numberInput = AppDOM.querySelector('#number-of-events-input')

      await user.type(numberInput, '{backspace}{backspace}10');
    });

    then('10 events should be displayed', async () => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems).toHaveLength(10);
      });
    });
  });

});