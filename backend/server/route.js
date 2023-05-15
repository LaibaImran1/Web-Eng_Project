import express from 'express';
import { createattendance, getallAttendance, getattendanceById, updateattendance, deleteattendance } from '../controller/attendance-controller.js';

const router = express.Router();

router.get('/', getallAttendance);
router.post('/add', createattendance);
router.get('/:id', getattendanceById);
router.put('/:id', updateattendance);
router.delete('/:id', deleteattendance);

export default router;
