import * as React from 'react';
import { useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function FormDialog ({ bookATestDrive, date, selectedTime }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [contactNumber, setContactNumber] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const handleClickOpen = () => { setOpen(true); };

  const handleClose = () => { setOpen(false); };

  return (
    <React.Fragment>
      <Button style={{
        border: '2px solid #0AE0D1',
        backgroundColor: hoveredLocation === location && '#0AE0D1',
        color: hoveredLocation === location ? 'white' : 'black',
      }}
      onMouseEnter={() => setHoveredLocation(location)}
      onMouseLeave={() => setHoveredLocation(null)} variant="outlined" onClick={handleClickOpen}>
        Reserve a time slot
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Reservation details</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: 'black' }}>
            Date: {date}
          </DialogContentText>
          <DialogContentText style={{ color: 'black', marginBottom: 10 }}>
            Time: {selectedTime}
          </DialogContentText>
          <DialogContentText>
            We need to following details from you to reserve your timeslot
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="contact number"
            label="Contact Number"
            type="Number"
            fullWidth
            variant="standard"
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={() => bookATestDrive(name, email, contactNumber)}>Reserve</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FormDialog