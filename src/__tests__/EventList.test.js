import React from "react";
import { render, within, waitFor } from '@testing-library/react';
import EventList from './../components/EventList';
import { getEvents } from '../api';
import App from '../App';

// Unit tests for EventList component
describe('<EventList /> component', () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  })

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
});

// Integration tests for EventList component
describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const AppDom = AppComponent.container.firstChild;
    const EventListDom = AppDom.querySelector('#event-list');
    await waitFor(() => {
      const EventListItems = within(EventListDom).getAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });
  });
});