import React from 'react';
import { render } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import mockData from '../mock-data';

describe('<Event /> component', () => {
	const event = mockData[0];
	let EventComponent;

	beforeEach(() => {
		EventComponent = render(<Event event={event} />);
	});

	test('renders the event title', () => {
		expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
	});

	test('renders the event time', () => {
    const formattedDate = new Date(event.start.dateTime).toString();
    expect(EventComponent.queryByText(formattedDate)).toBeInTheDocument();
  });

	test('renders the event location', () => {
		expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
	});

  test('renders the Show Details button', () => {
    expect(EventComponent.queryByText("Show Details")).toBeInTheDocument();
  });

  test('at start, the event details should be hidden', () => {
    expect(EventComponent.queryByText("About Event:")).not.toBeInTheDocument();
    expect(EventComponent.queryByText(`Organizer: ${event.organizer.email}`)).not.toBeInTheDocument();
    expect(EventComponent.queryByText("Add event to your calendar")).not.toBeInTheDocument();
  });

  test('renders the event details when the Show Details button is clicked', async () => {
    const user = userEvent.setup();
    EventComponent.rerender(<Event event={event} />);  // Re-render the same component

    const button = EventComponent.queryByText("Show Details");
    await user.click(button);
    
    expect(EventComponent.queryByText("About Event:")).toBeInTheDocument();
    expect(EventComponent.queryByText(`Organizer: ${event.organizer.email}`)).toBeInTheDocument();
    expect(EventComponent.queryByText("Add event to your calendar")).toBeInTheDocument();
  });

  test('hides the event details when the Hide Details button is clicked', async () => {
    const user = userEvent.setup();
    EventComponent.rerender(<Event event={event} />);  // Re-render the same component

    const button = EventComponent.queryByText("Show Details");
    await user.click(button);

    expect(EventComponent.queryByText("About Event:")).toBeInTheDocument();
    expect(EventComponent.queryByText(`Organizer: ${event.organizer.email}`)).toBeInTheDocument();
    expect(EventComponent.queryByText("Add event to your calendar")).toBeInTheDocument();

    const hideButton = EventComponent.queryByText("Hide Details");
    await user.click(hideButton);

    expect(EventComponent.queryByText("About Event:")).not.toBeInTheDocument();
    expect(EventComponent.queryByText(`Organizer: ${event.organizer.email}`)).not.toBeInTheDocument();
    expect(EventComponent.queryByText("Add event to your calendar")).not.toBeInTheDocument();
  });
});
