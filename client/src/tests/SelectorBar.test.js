import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectorBar from '../components/SelectorBar';

describe('SelectorBar', () => {
  const reservationLocations = ['dublin', 'cork', 'galway', 'limerick'];
  const setTestDriveLocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should change the background color on hover', () => {
    render(<SelectorBar allAvailableLocations={reservationLocations} setTestDriveLocation={setTestDriveLocation} />);

    const allLocationsButton = screen.getByText(/All locations/i);
    fireEvent.mouseEnter(allLocationsButton);
    expect(allLocationsButton).toHaveStyle('background-color: #DEDEDE');
    fireEvent.mouseLeave(allLocationsButton);
    expect(allLocationsButton).toHaveStyle('background-color: #F3F4F5');

    const locationButton = screen.getByText('dublin');
    fireEvent.mouseEnter(locationButton);
    expect(locationButton).toHaveStyle('background-color: #DEDEDE');
    fireEvent.mouseLeave(locationButton);
    expect(locationButton).toHaveStyle('background-color: #F3F4F5');
  });

  it('Should set the test drive location to the clicked location', () => {
    render(<SelectorBar allAvailableLocations={reservationLocations} setTestDriveLocation={setTestDriveLocation} />);
    const locationButton = screen.getByText('dublin');
    fireEvent.click(locationButton);
    expect(setTestDriveLocation).toHaveBeenCalledWith('dublin');
  });
});
