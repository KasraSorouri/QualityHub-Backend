import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import machineControllers from '../controllers/machines';

const router = express.Router();

// Get Machines
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', machineControllers.getAllMachines);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', machineControllers.getMachine);

// Create Machine
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), machineControllers.addMachine);

// Edit Machine
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), machineControllers.editMachine);

export default router;
