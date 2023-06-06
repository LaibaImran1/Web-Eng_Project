import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <div>
      <h1>Welcome to the Attendance Management System</h1>
      <ul>
        <li>
          <Link to="/attendance">Attendance List</Link>
        </li>
        <li>
          <Link to="/attendance/create">Create Attendance</Link>
        </li>
        <li>
          <Link to="/attendance/edit/:id">Edit Attendance</Link>
        </li>
        <li>
          <Link to="/attendance/:id">Attendance Details</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomeScreen;
