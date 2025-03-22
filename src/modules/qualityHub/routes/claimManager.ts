import express from 'express';

import claimControllers from '../controllers/claimManager';
import { rightAuthority, tokenExtractor } from '../../usersAndAuthentication/utils/midwares';

const router = express.Router();

// Get Claims
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', claimControllers.getAllClaims);

// Get Pending Claims
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/pending', claimControllers.getPendingClaims);

// Update Claim Status
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), claimControllers.updateClaimStatus);


export default router;