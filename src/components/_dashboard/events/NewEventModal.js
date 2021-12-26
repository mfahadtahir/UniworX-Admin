import React from 'react';

// material
import { Grid, Box, Modal, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';
import { storage } from '../../../firebase';
// import { LoaderContext } from '../../../App';
export const NewEventModal = ({ open, handleClose }) => {
  // const loader = React.useContext(LoaderContext);
  const handleSubmit = () => {
    // loader.setLoading(true);
    const data = {};
    data.event_name = document.getElementById('event-name').value;
    data.event_venue = document.getElementById('event-venue').value;
    data.event_description = document.getElementById('event-description').value;
    data.event_start_date = document.getElementById('event-start-date').value;
    data.event_end_date = document.getElementById('event-end-date').value;
    data.event_start_time = document.getElementById('event-start-time').value;
    data.event_end_time = document.getElementById('event-end-time').value;
    data.event_start_time_period = document.getElementById('event-start-time-period').value;
    data.event_end_time_period = document.getElementById('event-end-time-period').value;
    // data.event_teams = document.getElementById('event-teams').value;

    const imageRef = storage.ref(data.event_name + data.event_start_date);
    console.log('Uploading image', document.getElementById('event-image').files[0]);
    imageRef.put(document.getElementById('event-image').files[0]).then((snapshot) => {
      imageRef.getDownloadURL().then((url) => {
        data.image = url;
        data.session_id = localStorage.getItem('session_id');
        console.log(data);
        axios
          .post('https://pacific-dusk-26535.herokuapp.com/create-event', data)
          .then((eventRes) => {
            console.log('Event Added Successfully', eventRes);
            // loader.setLoading(false);
          })
          .catch((err) => console.log(err));
      });
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style}>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h4">
              Event
            </Typography>
            <Typography variant="body" component="div">
              Please input all data
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="event-name"
              fullWidth
              label="Name"
              variant="outlined"
              defaultValue="Some Event"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="event-venue"
              fullWidth
              label="Venue"
              variant="outlined"
              defaultValue="Audi"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="event-description"
              aria-label="Description"
              label="Description"
              multiline
              fullWidth
              rows={4}
              defaultValue="some description"
            />
          </Grid>

          <Grid item xs={6}>
            {/* <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/dd/yyyy"
          // value={value}
          // onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        /> */}
            <TextField
              id="event-start-date"
              fullWidth
              placeholder="YYYYMMDD"
              label="Start Date"
              variant="outlined"
              defaultValue="20220101"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="event-end-date"
              fullWidth
              placeholder="YYYYMMDD"
              label="End Date"
              variant="outlined"
              defaultValue="20220101"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              id="event-start-time"
              item
              placeholder="HHMM"
              label="Start Time"
              variant="outlined"
              defaultValue="0800"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              item
              id="event-end-time"
              placeholder="HHMM"
              label="End Time"
              variant="outlined"
              defaultValue="0900"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="event-start-time-period"
              placeholder="AM"
              label="Start Time Period"
              variant="outlined"
              defaultValue="AM"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              item
              id="event-end-time-period"
              placeholder="AM"
              label="End Time Period"
              variant="outlined"
              defaultValue="AM"
            />
          </Grid>
          {/* <Grid item xs={10}>
          <TextField
            id="event-teams"
            fullWidth 
            placeholder="Team A, Team B, Teab B"
            label="Teams"
            variant="outlined"
          />
        </Grid> */}
          <Grid item xs={2}>
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                id="event-image"
                onInput={() => {
                  document.getElementById('event-image');
                }}
                hidden
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit} variant="outlined">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  padding: 20,
  borderRadius: 5,

  background: 'white',
  boxShadow: 24,
  p: 4
};
