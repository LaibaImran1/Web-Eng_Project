import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled } from '@mui/material'
import { getAttendance, deleteAttendance} from '../Service/api';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #a599ea;
    color: #FFFFFF;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
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
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date/Time</TableCell> {/* Updated the column header */}
            <TableCell>Attendance</TableCell>
            <TableCell></TableCell>
          </THead>
        </TableHead>
        <TableBody>
        {attendance.map((item) => (
  <TRow key={item._id}>
    <TableCell>{item._id}</TableCell>
    <TableCell>{item.name}</TableCell>
    <TableCell>{item.datetime}</TableCell>
    <TableCell>{item.attendance}</TableCell>
    <TableCell>
      <Button sx={{ backgroundColor: '#a599ea' }} variant="contained" style={{ marginRight: 10 }} component={Link} to={`/edit/${item._id}`}>
        Edit
      </Button>
      <Button data-testid="AllAttendance2" color="error" variant="contained" onClick={() => deleteAttendanceData(item._id)}>
        Delete
      </Button>
    </TableCell>
  </TRow>
))}

        </TableBody>
      </StyledTable>
    </div>
  );
};

export default AllAttendance;
