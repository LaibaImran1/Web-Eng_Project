import express from 'express';
import{getAllAttendance,createAttendance,getAttendanceById,  deleteAttendance, updateAttendance} from '../controller/attendance-controller.js';
const router = express.Router();

router.get('/', getAllAttendance);
router.post('/add', createAttendance);
router.get('/:id', getAttendanceById);
router.delete('/:id', deleteAttendance);
router.put('/:id', updateAttendance);



export default router;
