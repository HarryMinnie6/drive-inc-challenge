import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MyCalendar from '../components/Calendar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { uppercaseFirstLetter } from '../utils/utils.js';

function VehicleBooking () {
  const [vehicle, setVehicle] = useState([]);
  const [vehicleReservations, setVehicleReservations] = useState([]);
  const { vehicleId } = useParams();
  const location = useLocation();
  const { imagePath } = location.state || {};
  const { vehicleBrandAndModel } = location.state || '';

  useEffect(() => {
    getVehicleInformation(vehicleId);
    getAllReservations(vehicleId);
  }, []);

  const getVehicleInformation = async (vehicleId) => {
    const vehicleResponse = await fetch(`http://localhost:3000/vehicles/single-vehicle/${vehicleId}`, {});
    const vehicleData = await vehicleResponse.json();
    setVehicle(vehicleData);
  };
  const getAllReservations = async (vehicleId) => {
    const reservationsResponse = await fetch(`http://localhost:3000/reservations/all-reservations-for-vehicle/${vehicleId}`, {});
    const reservationData = await reservationsResponse.json();
    setVehicleReservations(reservationData);
  };

  return (
    <>
      <div style={{ flexGrow: 1, backgroundColor: '#E6E5E5', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box
          component="img"
          sx={{
            height: 'auto',
            width: { xs: '100%', sm: '50%', md: '50%' },
            marginBottom: 3
          }}
          alt={vehicle.model}
          src={imagePath}
        />
        <Typography gutterBottom variant="h4" component="div" >
          {vehicleBrandAndModel}
        </Typography>

        <Typography variant="h4" sx={{ marginBottom: 1, color: '#8C949D' }}>
          {vehicle?.location && uppercaseFirstLetter(vehicle?.location)}
        </Typography>

        <Typography gutterBottom variant="h6" component="div" style={{ marginBottom: 15, color: '#8C949D' }}>
          Up to {vehicle.range}km Range
        </Typography>

        <MyCalendar vehicleDetails={vehicle} vehicleReservations={vehicleReservations} />
      </div>
    </>
  );
}

export default VehicleBooking;