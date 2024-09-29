import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useParams} from 'react-router-dom';
import MyCalendar from '../components/Calendar';


function VehicleBooking() {
  const [vehicle, setVehicle] = useState([]);
  const [vehicleReservations, setVehicleReservations] = useState([]);
  const { vehicleId } = useParams();
  
  useEffect(() => {
      getVehicleInformation(vehicleId)
      getAllReservations(vehicleId)
  }, []);

  const getVehicleInformation= async (vehicleId) => {
    console.log("VehicleId", vehicleId);
    
    const vehicleResponse = await fetch(`http://localhost:3000/vehicles/single-vehicle/${vehicleId}`, {})
    const vehicleData = await vehicleResponse.json();
    setVehicle(vehicleData)
  }
  const getAllReservations = async (vehicleId) => {
    const reservationsResponse = await fetch(`http://localhost:3000/reservations/all-reservations-for-vehicle/${vehicleId}`, {})
    const reservationData = await reservationsResponse.json();
    setVehicleReservations(reservationData)
  }

  return (
    <>
    <div>
       <p>{vehicleReservations[0]?.customerEmail? vehicleReservations[0]?.customerEmail : "kk"}</p>
        <p>{vehicle.id}</p>
        <p>{vehicle.location}</p>
        {/* {console.log(typeof vehicle.availableDays[0])} */}
        
        <p>{vehicle.type}</p>
        <p>{vehicle.availableToTime}</p>
        <p>{vehicle.availableFromTime}</p>
        <p>{vehicle.minimumMinutesBetweenBookings}</p>
    </div>
    <div>
        <MyCalendar vehicleDetails={vehicle} vehicleReservations={vehicleReservations}/>
    </div>

    </>
  )
}

export default VehicleBooking