import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

// How our document looks like
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  clockIn: {
    type: String,
    required: true,
  },
  clockOut: {
    type: String,
    required: true,
  },

  attendance: {
    type: String,
    required: true,
},
hoursWorked: {
    type: String,
    required: true,
  },
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'Attendance');
// We need to turn it into a model
const postAttendance = mongoose.model('Attendance', userSchema);

export default postAttendance;
