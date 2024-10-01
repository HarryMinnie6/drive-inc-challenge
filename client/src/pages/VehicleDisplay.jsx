import React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';

import DisplayCard from '../components/DisplayCard';
import SelectorBar from '../components/SelectorBar';

function VehicleDisplay () {
  const [allVehicles, setVehicles] = useState([]);
  const [allVehicleBrands, setVehicleBrands] = useState([]);
  const [testDriveLocation, setTestDriveLocation] = useState('');
  const [allAvailableLocations, setAllAvailableLocations] = useState([]);

  useEffect(() => {
    getAllVehicles();
    getAllVehicleBrands();
    getAllAvailableLocations();
  }, []);

  const getAllVehicles = async () => {
    const allVehiclesResponse = await fetch('http://localhost:3000/vehicles/all-vehicles', {})
    const allVehiclesData = await allVehiclesResponse.json();
    setVehicles(allVehiclesData);
  }

  const getAllVehicleBrands = async () => {
    const allVehicleBrandsResponse = await fetch('http://localhost:3000/vehicles/all-brands', {})
    const allVehicleBrandsData = await allVehicleBrandsResponse.json();
    setVehicleBrands(allVehicleBrandsData);
  }

  const getAllAvailableLocations = async () => {
    const allReservationsLocations = await fetch('http://localhost:3000/reservations/all-reservation-locations', {})
    const allLocationsData = await allReservationsLocations.json();
    setAllAvailableLocations(allLocationsData);
  }

  const uppercaseFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string.slice(1);
  }

  const vehicleBrands = allVehicleBrands[0]?.vehicleBrands;

  return (
    <div>
      <SelectorBar allAvailableLocations={allAvailableLocations[0]?.locations} setTestDriveLocation={setTestDriveLocation} />
      {vehicleBrands?.map((vehicleType) => {
        const filteredVehicles = allVehicles?.filter(vehicle =>
          (vehicle.type.startsWith(vehicleType.toLowerCase()))
        );

        return (
          <>
            <h1 style={{ fontFamily: 'mundial, sans-serif', width: '100%', textAlign: 'center', marginBottom: 10 }}>{vehicleType}</h1>
            <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} >
              {filteredVehicles
                .filter(vehicle =>
                  vehicle.type.startsWith(vehicleType.toLowerCase()) &&
                  (testDriveLocation === '' || vehicle.location.toLowerCase() === testDriveLocation?.toLowerCase())
                )
                .map(vehicle => (
                  <DisplayCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </Box>
            {filteredVehicles.filter(vehicle =>
              vehicle.type.startsWith(vehicleType.toLowerCase()) &&
              (testDriveLocation === '' || vehicle.location.toLowerCase() === testDriveLocation.toLowerCase())
            ).length === 0 && (
              <p style={{fontFamily: 'mundial, sans-serif',width: '100%', textAlign: 'center'}}>There are currently no {vehicleType} models available in {uppercaseFirstLetter(testDriveLocation)}.</p>
            )}
          </>
        );
      })}
    </div>
  )
}

export default VehicleDisplay