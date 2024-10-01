import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

function DisplayCard ({ vehicle }) {
  const navigate = useNavigate();
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [randomNumber, setRandomNumber] = useState(1);

  useEffect(() => {
    // Generate the random number once when the component mounts
    setRandomNumber(Math.floor(Math.random() * 4) + 1);
  }, []); // Empty dependency array ensures it only runs once

  const navigateToBookingsPage = (vehicleId, imagePath, vehicleBrandAndModel) => {
    navigate(`/vehicle/${vehicleId}`, {
      state: { imagePath, vehicleBrandAndModel }
    });
  }

  const uppercaseFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string.slice(1);
  }

  const imagePathName = (vehicleType, randomNumber) => {
    return `/vehicles/${vehicleType}_${randomNumber}.png`
  }
  const imagePath = imagePathName(vehicle.type, randomNumber)

  const vehicleType = uppercaseFirstLetter(vehicle?.type.split('_')[0])
  const vehicleBrandAndModel = `${vehicleType} ${vehicle?.model}`
  return (
    <Card sx={{border: '1px solid #DEDEDE', boxShadow: 'none', backgroundColor: '#E6E5E5',minWidth: 400, maxWidth: 500, margin: '10px', marginBottom: 5 }}>
      
      <CardMedia
        sx={{ height: 140 }}
        image={imagePath}
        title={vehicleBrandAndModel}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" >
          {vehicleBrandAndModel}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" style={{color: '#8C949D'}}>
          Up to {vehicle.range}km Range
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {vehicle?.location && uppercaseFirstLetter(vehicle.location)}
        </Typography>
      </CardContent>
      <CardActions>
        <div style={{flexGrow: 1,display: 'flex', justifyContent: 'center'}}>
          <Button 
            onMouseEnter={() => setHoveredLocation(location)}
            onMouseLeave={() => setHoveredLocation(null)}
            onClick={() => navigateToBookingsPage(vehicle.id, imagePath, vehicleBrandAndModel)}
            style={{
              border: '2px solid #0AE0D1',
              backgroundColor: hoveredLocation === location && '#0AE0D1',
              color: hoveredLocation === location ? 'white' : 'black',
            }}
            size="small" >Book a test drive</Button>
        </div>
      </CardActions>
    </Card>
  );
}

export default DisplayCard