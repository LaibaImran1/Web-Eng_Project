import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Select, MenuItem, Button, styled, Typography, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getAttendance, editAttendance } from '../Service/api';
import editpage from '../Assets/Images/editpage.png';
const initialValue = {
  attendance: ''
};

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto;
  padding: 20px;
  border: 2px solid #a599ea;
  border-radius: 8px;
`;

const theme = createTheme({
  palette: {
    primary: {
      main: '#a599ea',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const StyledInputLabel = styled(InputLabel)`
 
  padding: 16px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 20px;
`;

const StyledButton = styled(Button)`
  background-color: #a599ea;
  color: white;
  margin-top: 16px;
  border-radius: 4px;
  padding: 8px 16px;
`;

const EditAttendance = () => {
  const [attendance, setAttendance] = useState(initialValue);
  const { attendance: selectedAttendance } = attendance;
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    loadAttendanceDetails();
  }, [id]);

  const loadAttendanceDetails = async () => {
    try {
      const response = await getAttendance(id);
      setAttendance({ attendance: response.data.attendance });
    } catch (error) {
      console.log(error);
    }
  };

  const editAttendanceDetails = async () => {
    try {
      const updatedAttendance = { attendance: selectedAttendance };
      const response = await editAttendance(id, updatedAttendance);
      navigate('/all');
    } catch (error) {
      console.log(error);
    }
  };

  const onValueChange = (e) => {
    setAttendance({ attendance: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <div data-testid="EditAttendance">
        <Container>
          <Typography variant="h4" style={{ marginBottom: '16px' }}>
            Edit Attendance
          </Typography>
          <FormControl>
            <StyledInputLabel htmlFor="attendance-input">Attendance</StyledInputLabel>
            <Select
              onChange={onValueChange}
              name="attendance"
              value={selectedAttendance}
              id="attendance-input"
              aria-describedby="attendance-helper-text"
              style={{ minWidth: 120, marginBottom: '16px' }}
            >
              <MenuItem value="Present">Present</MenuItem>
              <MenuItem value="Absent">Absent</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <StyledButton variant="contained" color="primary" onClick={editAttendanceDetails}>
              Edit Attendance
            </StyledButton>
          </FormControl>
        </Container>
        <img src={editpage}  style={{width: '30%', margin: '80px 0 0 35%'}}/>
      </div>
    </ThemeProvider>
    
  );
};

export default EditAttendance;
