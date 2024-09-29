import { Button } from '@mui/material';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function VehicleDisplay() {
  const [allVehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/vehicles//all-vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data));
    console.log("allVehicles", allVehicles);
  }, []);

  const navigateToBookingsPage = (vehicleId) => {
    navigate(`/vehicle/${vehicleId}`);}


  return (
    <>
     <div >
        {allVehicles.map((vehicle) => (
            <div key={vehicle.id}>
                <p>{vehicle.id}</p>
                <Button onClick={() => navigateToBookingsPage(vehicle.id)}>Make a booking</Button>
                
            </div>
        ))}
     </div>

    </>
  )
}

export default VehicleDisplay