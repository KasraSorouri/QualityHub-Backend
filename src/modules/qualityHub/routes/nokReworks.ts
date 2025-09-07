import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import reworkControllers from '../controllers/nokReworks';

const router = express.Router();

// Get Reworks
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', reworkControllers.getAllReworks);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', reworkControllers.getRework);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/nok/:id', reworkControllers.getReworksByNok);

// Create Rework
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), reworkControllers.addRework);

// Edit Rework
// eslint-disable-next-line @typescript-eslint/no-misused-promises
//router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), reworkControllers.editRework);

export default router;
