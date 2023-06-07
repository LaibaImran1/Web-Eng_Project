

import EditAttendance from './Component/EditAttendance';
import NavBar from './Component/NavBar';
import NotFound from './Component/NotFound'; 

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllAttendance from './Component/AllAttendance';
import AddAttendance from './Component/AddAttendace';


function App() {
  return (
    <div  data-testid="APP">
    
    <BrowserRouter>
      <NavBar />
      <Routes>
     
        <Route path="all" element={<AllAttendance /> } />
        <Route path="/add" element={<AddAttendance />} />
        <Route path="/edit/:id" element={<EditAttendance/>} />
        <Route path='/*' element={<NotFound />} />
        
      </Routes>
    </BrowserRouter>
    </div>
  
  );
}

export default App;
