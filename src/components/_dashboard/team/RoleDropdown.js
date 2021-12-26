import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

const RoleBasedPostion = {
  90: 'Director',
  70: 'Admin',
  60: 'Faculty Head',
  50: 'Faculty Co head',
  40: 'President',
  35: 'Vice President',
  30: 'Head',
  25: 'Co Head',
  20: 'Deputy',
  10: 'Coordinator',
  5: 'Member',
  0: 'No Access'
};

export function RoleDropdown({ userID, currentRole, dept }) {
  const [role, setRole] = React.useState(currentRole);

  const handleChange = (event) => {
    console.log('sessional_id: ', localStorage.getItem('session_id'));
    console.log('userID: ', userID);
    console.log('event.target.value: ', event.target.value);

    axios
      .post('https://pacific-dusk-26535.herokuapp.com/accesscontrol', {
        session_id: localStorage.getItem('session_id'),
        target_user_id: userID,
        new_val: event.target.value,
        dept_name: dept,
        society_id: JSON.parse(localStorage.getItem('user')).society_id
      })
      .then((res) => {
        setRole(event.target.value);
        console.log('Role updated Successfully: ', res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select value={role} onChange={handleChange}>
          {Object.keys(RoleBasedPostion).map((position, key) => (
            <MenuItem key={key} value={position}>
              {RoleBasedPostion[position]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
