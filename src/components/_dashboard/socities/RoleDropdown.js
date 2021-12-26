import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

export function RoleDropdown({ access, userID, name, societyID }) {
  const [teachers, setTeachers] = React.useState([]);
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
        // add new one
        // axios
        //   .post('https://pacific-dusk-26535.herokuapp.com/accesscontrol', {
        //     session_id: localStorage.getItem('session_id'),
        //     society_id: societyID,
        //     target_user_id: event.target.value,
        //     new_val: event.target.value
        //   })
        //   .then((res) => {
        //     setRole({ id: userID, role: event.target.value });
        //     console.log('Role updated Successfully: ', res);
        //   })
        //   .catch((err) => console.log(err));
        //   setRole(event.target.value);
        console.log('Role updated Successfully: ', res);
      });
  };

  useEffect(() => {
    axios
      .post('https://pacific-dusk-26535.herokuapp.com/get-free-faculty', {
        session_id: localStorage.getItem('session_id')
      })
      .then((res) => {
        let tempfaculty = res.data.faculty_list;
        tempfaculty = tempfaculty.filter(
          (faculty) => faculty.roles < JSON.parse(localStorage.getItem('user')).roles
        );
        setTeachers(tempfaculty);
        console.log('Free Teachers: ', res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select value={selectedTeacher} onChange={handleChange}>
          <MenuItem value={userID}>{name}</MenuItem>

          {teachers.map((teacher, key) => (
            <MenuItem key={key} value={teacher.id}>
              {teacher.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
