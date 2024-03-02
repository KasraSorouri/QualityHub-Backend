import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import nokDetectControllers from '../controllers/nokDetects';

const router = express.Router();

// Get NOK Detect
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', nokDetectControllers.getAllNokDetects);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokDetectControllers.getNokDetect);
router.get('/product/:id', nokDetectControllers.getNokDetectsByProduct)

// Create NOK Detect
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokDetectControllers.addNokDetect);

// Edit NOK Detect
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokDetectControllers.editNokDetect);


export default router;