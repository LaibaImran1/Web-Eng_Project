import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import AttendanceListScreen from './screens/AttendanceListScreen';
import AttendanceCreateScreen from './screens/AttendanceCreateScreen';

import AttendanceEditScreen from './screens/AttendanceEditScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
          <Route  path="/attendance" element={<AttendanceListScreen />} />
          <Route  path="/attendance/create" element={<AttendanceCreateScreen />} />
         
          <Route  path="/attendance/:id/edit" element={<AttendanceEditScreen />} />
        </Routes>
    </Router>
  );
};

export default App;
