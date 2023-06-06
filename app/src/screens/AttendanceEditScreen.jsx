import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getAttendance, editAttendance } from '../Service/api';

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

const AttendanceEditScreen = () => {
  const [attendance, setAttendance] = useState(initialValue);
  const { employeeId, date, clockIn, clockOut, leaveType, hoursWorked } = attendance;
  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    loadAttendanceDetails();
  }, []);

  const loadAttendanceDetails = async () => {
    const response = await getAttendance(id);
    setAttendance(response.data);
  };

  const editAttendanceDetails = async () => {
    const response = await editAttendance(id, attendance);
    navigate('/all');
  };

  const onValueChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h4">Edit Information</Typography>
      <FormControl>
        <InputLabel htmlFor="employeeId-input">Employee ID</InputLabel>
        <Input onChange={onValueChange} name="employeeId" value={employeeId} id="employeeId-input" aria-describedby="employeeId-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="date-input">Date</InputLabel>
        <Input onChange={onValueChange} name="date" value={date} id="date-input" type="date" aria-describedby="date-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="clockIn-input">Clock In</InputLabel>
        <Input onChange={onValueChange} name="clockIn" value={clockIn} id="clockIn-input" type="time" aria-describedby="clockIn-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="clockOut-input">Clock Out</InputLabel>
        <Input onChange={onValueChange} name="clockOut" value={clockOut} id="clockOut-input" type="time" aria-describedby="clockOut-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="leaveType-input">Leave Type</InputLabel>
        <Input onChange={onValueChange} name="leaveType" value={leaveType} id="leaveType-input" aria-describedby="leaveType-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="hoursWorked-input">Hours Worked</InputLabel>
        <Input onChange={onValueChange} name="hoursWorked" value={hoursWorked} id="hoursWorked-input" type="number" aria-describedby="hoursWorked-helper-text" />
      </FormControl>
      <FormControl>
        <Button variant="contained" color="primary" onClick={editAttendanceDetails}>Edit Attendance</Button>
      </FormControl>
    </Container>
  );
};

export default AttendanceEditScreen;
