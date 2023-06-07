import { useState } from 'react';
import { addAttendance } from '../Service/api';
import { FormGroup, FormControl, InputLabel, Select, MenuItem, Button, styled, Typography, Input, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const initialValue = {
  name: '',
  datetime: '',
  attendance: ''
};

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto;
  & > div {
    margin-top: 20px;
  }
`;

const AddAttendance = () => {
  const [attendance, setAttendance] = useState(initialValue);
  const { name, datetime, attendance: selectedAttendance } = attendance;

  let navigate = useNavigate();

  const onValueChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const addAttendanceDetails = async () => {
    await addAttendance(attendance);
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
            name="datetime"
            value={datetime}
            id="datetime-input"
            label="Date/Time"
            type="datetime-local"
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
            <MenuItem value="Absent">Absent</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Button variant="contained" color="primary" onClick={addAttendanceDetails}>
            Add Attendance
          </Button>
        </FormControl>
      </Container>
    </div>
  );
};

export default AddAttendance;
