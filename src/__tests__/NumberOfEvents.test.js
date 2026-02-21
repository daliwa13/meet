import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents numberOfEvents={32} />);
  });

  test('renders number input', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();
  });

  test('renders correct placeholder number of events in the input field', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberInput).toHaveAttribute('value', '32');
  });

  test('user can change the number of events by typing in the input field', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    NumberOfEventsComponent.rerender(<NumberOfEvents 
      numberOfEvents={32} 
      setNumberOfEvents={() => { }} />); // Rerender the component with dummy setNumberOfEvents function to allow input changes
    await user.type(numberInput, '{backspace}{backspace}10'); // Simulate user removing current number and typing "10" in the input field
    expect(numberInput).toHaveValue(10);
  });

  test('input rejects 0 and negative numbers', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    NumberOfEventsComponent.rerender(<NumberOfEvents 
      numberOfEvents={32} 
      setNumberOfEvents={() => { }} />); // Rerender the component with dummy setNumberOfEvents function to allow input changes
    await user.type(numberInput, "{backspace}{backspace}0"); //testing "0" input
    expect(numberInput).toHaveValue(1);
    await user.type(numberInput, "{backspace}-5"); // testing negative number input
    expect(numberInput).toHaveValue(1);
  });

  test('input rejects non-numeric characters', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    NumberOfEventsComponent.rerender(<NumberOfEvents 
      numberOfEvents={"32"} // Testing non-numeric input
      setNumberOfEvents={() => { }} />); // Rerender the component with dummy setNumberOfEvents function to allow input changes
      await user.type(numberInput, "{backspace}{backspace}abc");
      expect(numberInput).toHaveValue(null);
  });

  test('input rejects non-numeric characters', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    NumberOfEventsComponent.rerender(<NumberOfEvents 
      numberOfEvents={32} 
      setNumberOfEvents={() => { }} />); // Rerender the component with dummy setNumberOfEvents function to allow input changes
    await user.type(numberInput, "{backspace}{backspace}");
    expect(numberInput).toHaveValue(null);
  });
});