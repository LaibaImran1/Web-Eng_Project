import Attendance from "../model/Attendance.js";
import autoIncrement from "mongoose-auto-increment";

// Create a new attendance record
const createAttendance = async (req, res) => {
    try {
      const { employeeId, date, clockIn, clockOut } = req.body;
  
      // Calculate hours worked
      const milliseconds = new Date(clockOut) - new Date(clockIn);
      const hoursWorked = milliseconds / (1000 * 60 * 60);
  
      // Check if leaveType is required
      let leaveType;
      if (hoursWorked < 8) {
        leaveType = req.body.leaveType;
        if (!leaveType) {
          return res.status(400).json({ error: 'Leave type is required for hours worked less than 8.' });
        }
      }
  
      const attendance = new Attendance({
       
        employeeId,
        date,
        clockIn,
        clockOut,
        leaveType,
        hoursWorked,
      });
      
  
      const newAttendance = await attendance.save();
  
      res.status(201).json(newAttendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Get all attendance records
  const getAllAttendance = async (req, res) => {
    try {
      const attendance = await Attendance.find();
  
      res.json(attendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Get a single attendance record by ID
  const getAttendanceById = async (req, res) => {
    try {
      const attendance = await Attendance.findById(req.params.id);
  
      if (!attendance) {
        return res.status(404).json({ error: 'Attendance record not found' });
      }
  
      res.json(attendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Update an attendance record
  const updateAttendance = async (req, res) => {
    try {
      const { employeeId, date, clockIn, clockOut } = req.body;
  
      // Calculate hours worked
      const milliseconds = new Date(clockOut) - new Date(clockIn);
      const hoursWorked = milliseconds / (1000 * 60 * 60);
  
      // Check if leaveType is required
      let leaveType;
      if (hoursWorked < 8) {
        leaveType = req.body.leaveType;
        if (!leaveType) {
          return res.status(400).json({ error: 'Leave type is required for hours worked less than 8.' });
        }
      }
  
      const attendance = await Attendance.findById(req.params.id);
  
      if (!attendance) {
        return res.status(404).json({ error: 'Attendance record not found' });
      }
  
      attendance.employeeId = employeeId;
      attendance.date = date;
      attendance.clockIn = clockIn;
      attendance.clockOut = clockOut;
      attendance.leaveType = leaveType;
      attendance.hoursWorked = hoursWorked;
  
      const updatedAttendance = await attendance.save();
  
      res.json(updatedAttendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Delete an attendance record
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export {
  getAllAttendance,
  createAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
};







