import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import nokRcaController from '../controllers/nokRCAs';

const router = express.Router();

// Get Nok Rca
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', nokRcaController.getAllRcas);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokRcaController.getRca);

// get NOk RCAs by Nok Id
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/nok/:id', nokRcaController.getNokRcaByNok);

// Create | Update a RCA
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokRcaController.addRca);

// Remove a RCA
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.delete('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokRcaController.deleteRca);

export default router;
