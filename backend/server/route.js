import express from 'express';
import { deleteAttendance, addAttendance,getAttendance,getAttendanceById,editAttendance } from '../controller/attendance-controller.js';

const router = express.Router();

router.get('/', getAttendance);
router.post('/add', addAttendance);
router.get('/:id', getAttendanceById);
router.put('/:id', editAttendance);
router.delete('/:id', deleteAttendance);

export default router;