import { useState } from 'react';
import { addAttendance } from '../Service/api';
import { FormGroup, FormControl, InputLabel, Select, MenuItem, Button, styled, Typography, Input, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const initialValue = {
  name: '',
  date: new Date().toISOString().split('T')[0],
  clockIn: '',
  clockOut: '',
  attendance: ''
};

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto;
  & > div {
    margin-top: 20px;
  }
`;

const StyledButton = styled(Button)`
  background-color: #a599ea;
  color: #FFFFFF;
`;

const AddAttendance = () => {
  const [attendance, setAttendance] = useState(initialValue);
  const { name, date, clockIn, clockOut, attendance: selectedAttendance } = attendance;

  let navigate = useNavigate();

  const onValueChange = (e) => {
    const { name, value } = e.target;

    if (name === 'attendance' && value === 'Absent') {
      setAttendance({ ...attendance, [name]: value, clockIn: '00:00', clockOut: '00:00' });
    } else {
      setAttendance({ ...attendance, [name]: value });
    }
  };

  const calculateHoursWorked = () => {
    if (clockIn && clockOut && clockIn < clockOut) {
      const [startHour, startMinute] = clockIn.split(':');
      const [endHour, endMinute] = clockOut.split(':');

      const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${hours} hours ${minutes} minutes`;
    }
    return '';
  };

  const addAttendanceDetails = async () => {
    const hoursWorked = calculateHoursWorked();
    if (!hoursWorked) {
      console.warn('Cannot calculate hours worked. Please make sure the clock-in and clock-out times are set correctly.');
      return;
    }
  
    let attendanceDetails = {
      name,
      date,
      attendance: selectedAttendance,
      hoursWorked,
      clockIn: selectedAttendance === 'Absent' ? '00:00' : clockIn,
      clockOut: selectedAttendance === 'Absent' ? '00:00' : clockOut
    };
  
    await addAttendance(attendanceDetails);
    navigate('/all');
  };
  
  return (
    <div data-testid="AddAttendance1">
      <Container>
        <Typography variant="h4">Add Attendance</Typography>
        <FormControl>
          <InputLabel htmlFor="name-input">Name</InputLabel>
          <Input onChange={onValueChange} name="name" value={name} id="name-input" />
        </FormControl>
        <FormControl>
          <TextField
            onChange={onValueChange}
            name="date"
            value={date}
            id="date-input"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="attendance-input">Attendance</InputLabel>
          <Select
            onChange={onValueChange}
            name="attendance"
            value={selectedAttendance}
            id="attendance-input"
            aria-describedby="attendance-helper-text"
            style={{ minWidth: 120 }}
          >
            <MenuItem value="Present">Present</MenuItem>
            <MenuItem value="Leave"> Leave</MenuItem>
            <MenuItem value="Absent"> Absent</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            onChange={onValueChange}
            name="clockIn"
            value={clockIn}
            id="clockIn-input"
            label="Clock In"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            disabled={selectedAttendance === 'Absent'}
          />
        </FormControl>
        <FormControl>
          <TextField
            onChange={onValueChange}
            name="clockOut"
            value={clockOut}
            id="clockOut-input"
            label="Clock Out"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            disabled={selectedAttendance === 'Absent'}
          />
        </FormControl>
        <FormControl>
          <StyledButton variant="contained" color="primary" onClick={addAttendanceDetails}>
            Add Attendance
          </StyledButton>
        </FormControl>
      </Container>
    </div>
  );
};

export default AddAttendance;
