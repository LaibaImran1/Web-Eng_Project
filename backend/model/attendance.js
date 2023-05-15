import mongoose from 'mongoose';

const leaveTypeOptions = ['Vacation', 'Sick', 'Personal', 'Unpaid'];

const attendanceSchema = new mongoose.Schema({
 
  employeeId: { type: String, required: true },
  date: { type: Date, required: true },
  clockIn: { type: Date },
  clockOut: { type: Date },
  leaveType: {
    type: String,
    enum: leaveTypeOptions,
    required: function () {
      return this.hoursWorked < 8;
    }
  },
  hoursWorked: { type: Number, default: 0 },
  
},
{collection: 'Attendance' });

attendanceSchema.pre('save', function (next) {
  if (this.clockIn && this.clockOut) {
    const milliseconds = this.clockOut - this.clockIn;
    this.hoursWorked = milliseconds / (1000 * 60 * 60);
  }
  next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
