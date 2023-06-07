import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

// how our document look like
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    datetime: { // Updated field name from 'username' to 'datetime'
        type: Date, // Assuming datetime is a Date type
        required: true,
    },
    attendance: {
        type: String,
        required: true,
    },
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'Attendance');
// we need to turn it into a model
const postAttendance = mongoose.model('Attendance', userSchema);

export default postAttendance;
