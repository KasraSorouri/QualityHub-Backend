import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import nokControllers from '../controllers/nokGrps';

const router = express.Router();

// Get Nok Grpups
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', nokControllers.getAllNokGrps);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokControllers.getNokGrp);

// Create NokGrp
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokControllers.addNokGrp);

// Edit NokGrp
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokControllers.editNokGrp);

export default router;
