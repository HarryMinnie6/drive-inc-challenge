import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {useNavigate } from 'react-router-dom';

function NavBar
() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  }

  return (
    <AppBar position="static" style={{backgroundColor: '#2D2E2F', margin: 0}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div style={{ flexGrow: 1 }}>
            <Button onClick={() => navigateToHome()} style={{fontSize: '25px',color: 'white', fontFamily: 'mundial, sans-serif'}} >Drive Inc. Challenge</Button>
          </div>
          <Button
            onClick={() => navigateToHome()}
            style={{color: 'white'}} to="/">Home</Button>
           
        </Toolbar>
      </Container>
    </AppBar>
    
  );
}
export default NavBar
;