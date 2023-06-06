import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled } from '@mui/material';
import { getAttendance, deleteAttendance } from '../Service/api';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #000000;
    color: #FFFFFF;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const AttendanceListScreen = () => {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    fetchAttendanceList();
  }, []);

  const deleteAttendanceData = async (id) => {
    await deleteAttendance(id);
    fetchAttendanceList();
  };

  const fetchAttendanceList = async () => {
    try {
      const response = await getAttendance();
      setAttendanceList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledTable>
      <TableHead>
        <THead>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Clock In</TableCell>
          <TableCell>Clock Out</TableCell>
          <TableCell>Hours Worked</TableCell>
          <TableCell></TableCell>
        </THead>
      </TableHead>
      <TableBody>
        {attendanceList.map((attendance) => (
          <TRow key={attendance._id}>
            <TableCell>{attendance._id}</TableCell>
            <TableCell>{attendance.name}</TableCell>
            <TableCell>{attendance.username}</TableCell>
            <TableCell>{attendance.clockIn}</TableCell>
            <TableCell>{attendance.clockOut}</TableCell>
            <TableCell>{attendance.hoursWorked}</TableCell>
            <TableCell>
              <Button
                color="primary"
                variant="contained"
                style={{ marginRight: 10 }}
                component={Link}
                to={`/attendance/edit/${attendance._id}`}
              >
                Edit
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => deleteAttendanceData(attendance._id)}
              >
                Delete
              </Button>
            </TableCell>
          </TRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default AttendanceListScreen;
