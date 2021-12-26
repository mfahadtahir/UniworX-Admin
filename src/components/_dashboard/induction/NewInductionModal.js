import React from 'react';

// material
import {
  Grid,
  Box,
  Modal,
  Button,
  Typography,
  TextField,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox
} from '@mui/material';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const teams = [
  'Event Management',
  'Participant Relation',
  'Guest Relation',
  'Internal Affair',
  'External Affair',
  'SOP Complience',
  'Technical',
  'Operational',
  'Web',
  'Mobile',
  'Artificial Intelligence',
  'TensorFlow',
  'Public Speaking',
  'Writter',
  'Music'
];

export const NewInductionModal = ({ open, handleClose }) => {
  const [selectedTeams, setSelectedTeams] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setSelectedTeams(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleSubmit = () => {
    const data = {};
    data.title = document.getElementById('induction-title').value;
    data.dept_list = document
      .getElementById('induction-teams')
      .value.split(',')
      .map((item) => item.trim());
    data.description = document.getElementById('induction-description').value;
    // data.event_teams = document.getElementById('event-teams').value;

    data.session_id = localStorage.getItem('session_id');
    data.induction_type_excom = false;
    data.society_id = JSON.parse(localStorage.getItem('user')).society_id;
    console.log(data);
    axios
      .post('https://pacific-dusk-26535.herokuapp.com/create-induction', data)
      .then((indRes) => {
        console.log('Induction Added Successfully', indRes);
      })
      .catch((err) => console.log(err));
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
              Induction
            </Typography>
            <Typography variant="body" component="div">
              Please input all data
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="induction-title"
              fullWidth // id="outlined-basic"
              label="Title"
              variant="outlined"
              defaultValue="Induction for Teams"
            />
          </Grid>
          <Grid item xs={12}>
            {/* <TextField
              id="induction-teams"
              fullWidth // id="outlined-basic"
              label="Teams"
              variant="outlined"
              defaultValue="Team1, Team2, Team3"
            /> */}
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">Teams</InputLabel>
              <Select
                fullWidth
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedTeams}
                onChange={handleChange}
                input={<OutlinedInput label="Teams" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {teams.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={selectedTeams.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="induction-description"
              aria-label="Description"
              label="Description"
              multiline
              fullWidth
              rows={4}
              defaultValue="Some Details"
            />
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
