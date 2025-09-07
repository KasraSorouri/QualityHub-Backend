import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import rcaCodeControllers from '../controllers/rcaCodes';

const router = express.Router();

// Get RcaCodes
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', rcaCodeControllers.getAllRcaCodes);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', rcaCodeControllers.getRcaCode);

// Create RcaCode
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), rcaCodeControllers.addRcaCode);

// Edit RcaCode
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), rcaCodeControllers.editRcaCode);

export default router;
