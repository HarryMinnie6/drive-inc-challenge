import { Routes, Route, Navigate } from 'react-router-dom';
import { React,} from 'react';
import VehicleDisplay from './pages/VehicleDisplay';
import Navbar from './components/Navbar';
import VehicleBooking from './pages/VehicleBooking';
import './App.css';

export default function App () {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<VehicleDisplay />} />
        <Route exact path="/vehicle/:vehicleId" element={<VehicleBooking />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}