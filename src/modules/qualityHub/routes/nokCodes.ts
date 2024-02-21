import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import nokControllers from '../controllers/nokCodes';

const router = express.Router();

// Get Nok Grpups
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', nokControllers.getAllNokCodes);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokControllers.getNokCode);

// Create NokCode
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokControllers.addNokCode);

// Edit NokCode
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokControllers.editNokCode);


export default router;