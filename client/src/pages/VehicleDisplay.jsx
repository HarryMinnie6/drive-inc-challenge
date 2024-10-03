import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DisplayCard from '../components/DisplayCard';
import { uppercaseFirstLetter } from '../utils/utils.js';

function VehicleDisplay() {
  const [allVehicles, setAllVehicles] = useState([]);
  const [allVehicleBrands, setVehicleBrands] = useState([]);
  const [allVehicleShapes, setAllVehicleShapes] = useState([]);
  const [testDriveLocation, setTestDriveLocation] = useState('All Locations');
  const [selectedVehicleShape, setSelectedVehicleShape] = useState('All Body Shapes');
  const [allAvailableLocations, setAllAvailableLocations] = useState([]);

  useEffect(() => {
    getAllVehicles();
    getAllVehicleBrands();
    getAllAvailableLocations();
    getAllVehicleShapes();
  }, []);

  const getAllVehicles = async () => {
    const allVehiclesResponse = await fetch('http://localhost:3000/vehicles/all-vehicles', {});
    const allVehiclesData = await allVehiclesResponse.json();
    setAllVehicles(allVehiclesData);
  };

  const getAllVehicleBrands = async () => {
    const allVehicleBrandsResponse = await fetch('http://localhost:3000/vehicles/all-brands', {});
    const allVehicleBrandsData = await allVehicleBrandsResponse.json();
    setVehicleBrands(allVehicleBrandsData);
  };

  const getAllVehicleShapes = async () => {
    const allVehicleTypesResponse = await fetch('http://localhost:3000/vehicles/all-shapes', {});
    const allVehicleTypesData = await allVehicleTypesResponse.json();
    setAllVehicleShapes(allVehicleTypesData);
  };

  const getAllAvailableLocations = async () => {
    const allReservationsLocations = await fetch('http://localhost:3000/reservations/all-reservation-locations', {});
    const allLocationsData = await allReservationsLocations.json();
    setAllAvailableLocations(allLocationsData);
  };

  const vehicleBrands = allVehicleBrands[0]?.vehicleBrands;

  return (
    <div>
      <Typography
        variant="h5"
        sx={{ fontFamily: 'mundial, sans-serif', width: '100%', textAlign: 'center', marginTop: 2, marginBottom: 2 }}
      >
        Book a test drive today
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, marginTop: 5, marginLeft: 3, marginRight: 3 }}>
        <Box sx={{ width: '48%' }}>
          <Select
            fullWidth
            value={testDriveLocation}
            onChange={(e) => setTestDriveLocation(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a location
            </MenuItem>
            <MenuItem value="All Locations">All Locations</MenuItem>
            {allAvailableLocations[0]?.locations?.map((location, index) => (
              <MenuItem key={index} value={location}>
                {uppercaseFirstLetter(location)}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ width: '48%' }}>
          <Select
            fullWidth
            value={selectedVehicleShape}
            onChange={(e) => setSelectedVehicleShape(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a Body Shape
            </MenuItem>
            <MenuItem value="All Body Shapes">Select A Body Shape</MenuItem>
            {allVehicleShapes[0]?.types?.map((shape, index) => (
              <MenuItem key={index} value={shape}>
                {uppercaseFirstLetter(shape)}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {vehicleBrands?.map((vehicleType) => {
        const filteredVehicles = allVehicles?.filter(vehicle =>
          vehicle.type.startsWith(vehicleType.toLowerCase())
        );

        const vehiclesToDisplay = filteredVehicles.some(vehicle =>
          (selectedVehicleShape === '' || vehicle.shape?.toLowerCase() === selectedVehicleShape?.toLowerCase()) &&
          (testDriveLocation === '' || vehicle.location.toLowerCase() === testDriveLocation?.toLowerCase())
        );

        return (
          <React.Fragment key={vehicleType}>
            {vehiclesToDisplay && (
              <Typography
                variant="h4"
                sx={{ fontFamily: 'mundial, sans-serif', width: '100%', textAlign: 'center', marginTop: 5, marginBottom: 2}}
              >
                {vehicleType}
              </Typography>
            )}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
              {filteredVehicles
                .filter(vehicle =>
                  (selectedVehicleShape === 'All Body Shapes' || vehicle.shape?.toLowerCase() === selectedVehicleShape?.toLowerCase()) &&
                  (testDriveLocation === 'All Locations' || vehicle.location.toLowerCase() === testDriveLocation?.toLowerCase())
                )
                .map(vehicle => (
                  <DisplayCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </Box>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default VehicleDisplay;