import express from 'express';

import iqcControllers from '../controllers/iqcManager';
import { rightAuthority, tokenExtractor } from '../../usersAndAuthentication/utils/midwares';

const router = express.Router();

// get All IQCs
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', iqcControllers.getAllIQCs);

// Get Penging IQCs
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/pending', iqcControllers.getPendingIQCs);

// Update Material Status 
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), iqcControllers.updateMaterialStatus);

export default router;