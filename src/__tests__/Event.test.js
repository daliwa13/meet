import React from 'react';
import { render } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import mockData from '../mock-data';

//Unite tests for Event component
describe('<Event /> component', () => {
	const event = mockData[0];
	let EventComponent;

	beforeEach(() => {
		EventComponent = render(<Event event={event} />);
	});

	test('renders the event title', () => {
		expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
	});

  test('renders empty title when event.summary is missing', () => {
    const eventWithoutSummary = { ...event, summary: undefined };
    EventComponent.rerender(<Event event={eventWithoutSummary} />);
    const heading = EventComponent.queryByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('');
  });

	test('renders the event time', () => {
    const formattedDate = new Date(event.start.dateTime).toString();
    expect(EventComponent.queryByText(formattedDate)).toBeInTheDocument();
  });

  test('renders empty date when event.start.dateTime is missing', () => {
    const eventWithoutDate = { ...event, start: {} };
    EventComponent.rerender(<Event event={eventWithoutDate} />);
    const paragraphs = EventComponent.queryAllByRole('paragraph');
    expect(paragraphs[0]).toHaveTextContent('');
  });

	test('renders the event location', () => {
		expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
	});

  test('renders empty location when event.location is missing', () => {
    const eventWithoutLocation = { ...event, location: undefined };
    EventComponent.rerender(<Event event={eventWithoutLocation} />);
    const paragraphs = EventComponent.queryAllByRole('paragraph');
    expect(paragraphs[1]).toHaveTextContent('');
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
