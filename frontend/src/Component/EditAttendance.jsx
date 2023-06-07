import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Select, MenuItem, Button, styled, Typography, Input, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getAttendance, editAttendance } from '../Service/api';

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

const EditAttendance = () => {
  const [attendance, setAttendance] = useState(initialValue);
  const { name, datetime, attendance: selectedAttendance } = attendance;
  const { id } = useParams();
  console.log(id);
  let navigate = useNavigate();

  useEffect(() => {
    loadAttendanceDetails();
  }, [id]);

  const loadAttendanceDetails = async () => {
    try {
      const response = await getAttendance(id);
      setAttendance(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editAttendanceDetails = async () => {
    try {
      const response = await editAttendance(id, attendance);
      navigate('/all');
    } catch (error) {
      console.log(error);
    }
  };

  const onValueChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  return (
    <div data-testid="EditAttendance">
      <Container injectFirst>
        <Typography variant="h4">Edit Information</Typography>
        <FormControl>
          <InputLabel htmlFor="name-input">Name</InputLabel>
          <Input
            onChange={onValueChange}
            name="name"
            value={name}
            id="name-input"
            aria-describedby="name-helper-text"
          />
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
          <Button sx={{ backgroundColor: '#a599ea' }} variant="contained" color="primary" onClick={editAttendanceDetails}>
            Edit Attendance
          </Button>
        </FormControl>
      </Container>
    </div>
  );
};

export default EditAttendance;
