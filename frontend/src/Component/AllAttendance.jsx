import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled } from '@mui/material';
import { getAttendance, deleteAttendance } from '../Service/api';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto;
  font-family: 'Poppins', sans-serif;
  border: 1px solid #e0e0e0;
  border-collapse: collapse;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #a599ea;
    color: #FFFFFF;
    font-weight: bold;
    padding: 12px;
    text-align: left;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
  }
`;

const ActionButton = styled(Button)`
  background-color: ${({ variant }) => (variant === 'edit' ? '#a599ea' : '#f44336')};
  color: #FFFFFF;
  margin-right: 10px;
  padding: 6px 16px;
  border-radius: 4px;
`;

const AllAttendance = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    getAllAttendance();
  }, []);

  const deleteAttendanceData = async (id) => {
    try {
      await deleteAttendance(id);
      getAllAttendance();
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  const getAllAttendance = async () => {
    try {
      const response = await getAttendance();
      setAttendance(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <StyledTable data-testid="AllAttendance1">
        <TableHead>
          <THead>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Clock In</TableCell>
            <TableCell>Clock Out</TableCell>
            <TableCell>Attendance</TableCell>
            <TableCell>Hours Worked</TableCell>
            <TableCell></TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {attendance.map((item) => (
            <TRow key={item._id}>
              <TableCell>{item._id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.clockIn}</TableCell>
              <TableCell>{item.clockOut}</TableCell>
              <TableCell>{item.attendance}</TableCell>
              <TableCell>{item.hoursWorked}</TableCell>
              <TableCell>
                <ActionButton variant="edit" component={Link} to={`/edit/${item._id}`}>
                  Edit
                </ActionButton>
                <ActionButton variant="delete" color="error" onClick={() => deleteAttendanceData(item._id)}>
                  Delete
                </ActionButton>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
    </div>
  );
};

export default AllAttendance;
