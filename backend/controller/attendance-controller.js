import Attendance from "../model/Attendance.js";

// Get all attendance records
export const getAttendance = async (request, response) => {
  try {
    const attendance = await Attendance.find();
    response.status(200).json(attendance);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Save attendance in database
export const addAttendance = async (request, response) => {
  const attendanceData = request.body;
  const newAttendance = new Attendance(attendanceData);

  try {
    await newAttendance.save();
    response.status(201).json(newAttendance);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getAttendanceById = async (request, response) => {
  const attendanceId = request.params.id;

  try {
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
      return response.status(404).json({ message: "Attendance not found" });
    }
    response.status(200).json(attendance);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const editAttendance = async (request, response) => {
  const attendanceId = request.params.id;
  const updatedAttendanceData = request.body;

  try {
    const attendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      updatedAttendanceData,
      { new: true }
    );
    if (!attendance) {
      return response.status(404).json({ message: "Attendance not found" });
    }
    response.status(200).json(attendance);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const deleteAttendance = async (request, response) => {
  const attendanceId = request.params.id;

  try {
    const attendance = await Attendance.findByIdAndDelete(attendanceId);
    if (!attendance) {
      return response.status(404).json({ message: "Attendance not found" });
    }
    response.status(200).json("Attendance deleted successfully");
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};





