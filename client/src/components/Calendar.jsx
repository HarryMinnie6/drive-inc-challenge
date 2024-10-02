import { Button } from '@mui/material';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Dialog from './Dialog';
import SnackBar from './SnackBar';
import './Calendar.css';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { navigateToHome } from '../utils/utils.js';

function MyCalendar ({ vehicleDetails, vehicleReservations }) {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const availableDays = vehicleDetails?.availableDays;
  const availableFromTime = vehicleDetails?.availableFromTime;
  const availableToTime = vehicleDetails?.availableToTime;

  const generateAvailableTimeSlots = (availableFromTime, availableToTime,) => {
    const slotDurationMinutes = 45;
    const bufferMinutes = 15;
    let slots = [];
    const firstAvailablilitySlot = new Date(`1970-01-01T${availableFromTime}Z`); // NOTE: reservation times are in this format
    const lastAvailbilitySlot = new Date(`1970-01-01T${availableToTime}Z`);

    while (firstAvailablilitySlot <= lastAvailbilitySlot) {
      const endOfTimeSlot = new Date(firstAvailablilitySlot.getTime());
      endOfTimeSlot.setMinutes(endOfTimeSlot.getMinutes() + slotDurationMinutes);
      const formattedSlot = `${firstAvailablilitySlot.toUTCString().slice(17, 22)} - ${endOfTimeSlot.toUTCString().slice(17, 22)}`;
      slots.push(formattedSlot);
      firstAvailablilitySlot.setMinutes(firstAvailablilitySlot.getMinutes() + slotDurationMinutes + bufferMinutes);
    }
    return slots;
  };

  const timeSlots = generateAvailableTimeSlots(availableFromTime, availableToTime);

  const disableUnavailableDays = ({ date }) => {
    const today = new Date();

    // this below stops today being disabled...
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date < today) return true; // disables 'yesterday' etc

    const dayOfWeek = date.getDay();
    const dayNames = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];
    const isAvailable = availableDays?.includes(dayNames[dayOfWeek]);
    return !isAvailable;
  };

  const onDateChange = (date) => {
    setDate(date);
    setSelectedTime(null);
  };

  const onTimeSlotChange = (time) => {
    setSelectedTime(time);
  };

  const reservationsArray = [];
  vehicleReservations.map((reservation) => {
    const reservationDate = reservation.startDateTime.slice(0, 10);
    const formattedReservation = `${reservation.startDateTime.slice(11, 16)} - ${reservation.endDateTime.slice(11, 16)}`;
    reservationsArray.push({ day: reservationDate, time: formattedReservation });
  });

  const dateStr = new Date(date);
  const year = dateStr.getFullYear();
  const month = String(dateStr.getMonth() + 1).padStart(2, '0');
  const day = String(dateStr.getDate()).padStart(2, '0');
  const formattedDatefromCalendarselection = `${year}-${month}-${day}`;

  const checkBookings = (timeSlots, reservations, date) => {
    return timeSlots.map(slot => {
      const [slotStart, slotEnd] = slot.split(' - ').map(time => new Date(`1970-01-01T${time}:00`));
      let isBooked = false;
      for (const reservation of reservations) {
        const [reservationStart, reservationEnd] = reservation.time.split(' - ').map(time => new Date(`1970-01-01T${time}:00`));
        if (slotStart < reservationEnd && slotEnd > reservationStart && date == reservation.day) {
          isBooked = true;
          break;
        }
      }
      return { time: slot, isBooked };
    });
  };

  const updatedTimeslots = checkBookings(timeSlots, reservationsArray, formattedDatefromCalendarselection);

  const bookATestDrive = async (customerName, customerEmail, contactNumber) => {
    try {
      const bookingStartTime = selectedTime.slice(0, 5);
      const [hours, minutes] = bookingStartTime.split(':');
      const date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
      date.setMinutes(date.getMinutes() + 45);
      const bookingEndTime = date.toTimeString().slice(0, 5);

      const startDateTime = `${formattedDatefromCalendarselection}T${bookingStartTime}:00Z`;
      const endDateTime = `${formattedDatefromCalendarselection}T${bookingEndTime}:00Z`;

      const requestBody = {
        customerEmail: customerEmail,
        customerName: customerName,
        customerPhone: contactNumber,
        vehicleId: vehicleDetails.id,
        startDateTime: startDateTime,
        endDateTime: endDateTime
      };

      const response = await fetch('http://localhost:3000/reservations/vehicle-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const successfullBookingResponse = await response.json();
      setBookingDetails(successfullBookingResponse);
      setSnackbarOpen(true);
      navigateToHome(navigate);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCloseSnackbar = () => { setSnackbarOpen(false); };

  return (
    <>
      <Typography gutterBottom variant="h6" component="div" style={{ margin: 10, color: 'black' }}>
        To reserve a test drive please select a date and time
      </Typography>
      <Calendar
        onChange={onDateChange}
        value={date}
        tileDisabled={disableUnavailableDays}
      />

      <Typography gutterBottom variant="h6" component="div" style={{ marginTop: 10, color: 'black' }}>
        {errorMessage && `Something went wrong, please try again later: ${errorMessage}`}
      </Typography>
      <Typography gutterBottom variant="h6" component="div" style={{ marginTop: 10, color: 'black' }}>
        {formattedDatefromCalendarselection && `Selected date: ${formattedDatefromCalendarselection}`}
      </Typography>
      <Typography gutterBottom variant="h6" component="div" style={{ marginBottom: 5, color: 'black' }}>
        {selectedTime && `Selected time: ${selectedTime}`}
      </Typography>

      {(date && selectedTime) && <Dialog bookATestDrive={bookATestDrive} date={formattedDatefromCalendarselection} selectedTime={selectedTime} />}
      <SnackBar
        open={snackbarOpen}
        handleClose={handleCloseSnackbar}
        message={bookingDetails?.message}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          {updatedTimeslots.map((slot, index) => (
            <Button
              key={index}
              style={{
                margin: '5px',
                marginTop: '20px',
                padding: '10px',
                color: slot.isBooked ? '#8C949D' : 'black',
                backgroundColor: slot.isBooked ? '#FFA39D' : selectedTime === slot.time ? '#0AE0D1' : 'lightgray',
                cursor: slot.isBooked ? 'not-allowed' : 'pointer',
              }}
              onClick={() => !slot.isBooked && onTimeSlotChange(slot.time)}
              disabled={slot.isBooked}
            >
              {slot.time}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyCalendar;
