import express from 'express';

import { tokenExtractor, roleAuthority } from '../../usersAndAuthentication/utils/midwares';

import workShiftControllers from '../controllers/workShifts';

const router = express.Router();

// Get WorkShifts
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', workShiftControllers.getAllWorkShifts);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', workShiftControllers.getWorkShift);

// Create WorkShift
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, roleAuthority(['ADMIN']), workShiftControllers.addWorkShift);

// Edit WorkShift
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, roleAuthority(['ADMIN']), workShiftControllers.editWorkShift);

export default router;
