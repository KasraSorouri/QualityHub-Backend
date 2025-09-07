import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import classCodeControllers from '../controllers/classCodes';

const router = express.Router();

// Get ClassCodes
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', classCodeControllers.getAllClassCodes);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', classCodeControllers.getClassCode);

// Create ClassCode
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), classCodeControllers.addClassCode);

// Edit ClassCode
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), classCodeControllers.editClassCode);

export default router;
