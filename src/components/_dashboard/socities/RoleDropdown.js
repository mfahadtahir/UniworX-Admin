import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

export function RoleDropdown({ freeTeachers, access, userID, name, societyID }) {
  const [selectedTeacher, setSelectedTeacher] = React.useState(userID);
  const handleChange = (event) => {
    console.log('sessional_id: ', localStorage.getItem('session_id'));
    console.log('society_id: ', societyID);
    console.log('event.target.value: ', event.target.value);
    console.log('new_val: ', access);
    // remove old one
    axios
      .post('https://pacific-dusk-26535.herokuapp.com/accesscontrol', {
        session_id: localStorage.getItem('session_id'),
        society_id: societyID,
        target_user_id: event.target.value,
        new_val: access
      })
      .then((res) => {
        console.log('Role updated Successfully: ', res);
        setSelectedTeacher(event.target.value);
      });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select value={selectedTeacher} onChange={handleChange}>
          <MenuItem value={userID}>{name}</MenuItem>

          {freeTeachers.map((teacher, key) => (
            <MenuItem key={key} value={teacher.id}>
              {teacher.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
