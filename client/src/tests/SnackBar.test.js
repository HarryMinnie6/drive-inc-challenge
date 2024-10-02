import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SnackBar from '../components/SnackBar';
import '@testing-library/jest-dom';

describe('SnackBar', () => {
  // Mocking handleClose()
  const handleClose = jest.fn();

  it('Should render the SnackBar with the correct message', () => {
    render(<SnackBar open={true} handleClose={handleClose} message="Booking Successful" />);
    const snackbar = screen.getByRole('alert');
    expect(snackbar).toBeInTheDocument();
    const displayMessage = screen.getByText('Booking Successful');
    expect(displayMessage).toBeInTheDocument();
  });

  it('Should call handleClose when the SnackBar is closed', () => {
    render(<SnackBar open={true} handleClose={handleClose} message="Booking Successful" />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('Should not render SnackBar when open is false', () => {
    render(<SnackBar open={false} handleClose={handleClose} message="Booking Successful" />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
