import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function NavBar () {
  return (
    <AppBar position="static" style={{ backgroundColor: '#2D2E2F', margin: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div style={{ flexGrow: 1 }}>
            <Link to="/">
              <Button style={{ fontSize: '25px', color: 'white', fontFamily: 'mundial, sans-serif' }} >Drive Inc. Challenge</Button>
            </Link>
          </div>
          <Link to="/">
            <Button
              style={{ color: 'white' }}>Home
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;