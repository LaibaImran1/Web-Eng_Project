import React, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography, Select, MenuItem } from '@mui/material';
import { addAttendance } from '../Service/api';
import { useNavigate } from 'react-router-dom';

const initialValue = {
  employeeId: '',
  date: '',
  clockIn: '',
  clockOut: '',
  leaveType: '',
  hoursWorked: 0
};

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% 0 0 25%;
  & > div {
    margin-top: 20px;
  }
`;

const AttendanceCreateScreen = () => {
  const [attendance, setAttendance] = useState(initialValue);
  const { employeeId, date, clockIn, clockOut, leaveType } = attendance;

  let navigate = useNavigate();

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setAttendance({ ...attendance, [name]: value });
  };

  const addAttendanceDetails = async () => {
    await addAttendance(attendance);
    navigate('/attendance');
  };

  const calculateHoursWorked = () => {
    const clockInTime = new Date(`01/01/2000 ${clockIn}`);
    const clockOutTime = new Date(`01/01/2000 ${clockOut}`);
    const milliseconds = clockOutTime - clockInTime;
    const hours = milliseconds / (1000 * 60 * 60);
    setAttendance({ ...attendance, hoursWorked: hours });
  };

  return (
    <Container>
      <Typography variant="h4">Add Attendance</Typography>
      <FormControl>
        <InputLabel htmlFor="employeeId-input">Employee ID</InputLabel>
        <Input onChange={onValueChange} name="employeeId" value={employeeId} id="employeeId-input" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="date-input">Date</InputLabel>
        <Input type="date" onChange={onValueChange} name="date" value={date} id="date-input" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="clockIn-input">Clock In</InputLabel>
        <Input type="time" onChange={onValueChange} name="clockIn" value={clockIn} id="clockIn-input" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="clockOut-input">Clock Out</InputLabel>
        <Input type="time" onChange={onValueChange} name="clockOut" value={clockOut} id="clockOut-input" />
      </FormControl>
      {attendance.hoursWorked < 8 && (
        <FormControl>
          <InputLabel id="leaveType-label">Leave Type</InputLabel>
          <Select
            labelId="leaveType-label"
            id="leaveType-select"
            name="leaveType"
            value={leaveType}
            onChange={onValueChange}
          >
            <MenuItem value="Vacation">Vacation</MenuItem>
            <MenuItem value="Sick">Sick</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
          </Select>
        </FormControl>
      )}
      <FormControl>
        <Button variant="contained" color="primary" onClick={calculateHoursWorked}>Calculate Hours Worked</Button>
      </FormControl>
      {attendance.hoursWorked >= 8 && (
        <FormControl>
          <Button variant="contained" color="primary" onClick={addAttendanceDetails}>Add Attendance</Button>
        </FormControl>
      )}
    </Container>
  );
};

export default AttendanceCreateScreen;
