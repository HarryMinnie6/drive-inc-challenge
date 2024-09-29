import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import VehicleDisplay from "./pages/VehicleDisplay";
import Navbar from "./components/Navbar"
import VehicleBooking from "./pages/VehicleBooking"
// import Login from "./components/Login";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');
      
    // if (token) {
    //   // User is logged in
      setUser({ token, email: userEmail });
      // console.log('User is logged in:', token, userEmail);
    // } else {
      // // No user is logged in
      // setUser(null);
      // console.log('No user is logged in');
    // }
  }, []);

  const handleLogin = (token, userEmail) => {
    setUser({ token, userEmail });
  };
  return (
    <>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <div>
        {/* {user ? (
          <h2>Welcome!{user.userEmail} You are logged in.</h2>
        ) : (
          // <Login onLogin={handleLogin} />
        )} */}
      </div>

      <Navbar />
      <Routes>
      <Route index element={<VehicleDisplay />} />
        <Route path="/" element={<Layout />}>
          
          {/* <Route path="/login" element={<Login />}></Route> */}
          <Route exact path="/vehicle/:vehicleId" element={<VehicleBooking/>} />
          

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<Navigate to="/" />} />

        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />


      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}




