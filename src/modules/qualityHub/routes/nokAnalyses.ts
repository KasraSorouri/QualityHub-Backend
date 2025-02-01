import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import nokAnalyseController from '../controllers/nokAnalyses';

const router = express.Router();

/*
// Get Nok Analyse
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', nokAnalyse.getAllAnalyses);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokAnalyse.getAnalyse);
*/

// get Analyse by Nok Id
router.get('/nok/:id', nokAnalyseController.getNokAnalyseByNok);

// Create Analyse
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokAnalyseController.addAnalyse);

// Set NOK Analyse is Done
router.put('/status/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokAnalyseController.updateAnalyseStatue);

// Edit Rework
// eslint-disable-next-line @typescript-eslint/no-misused-promises
//router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokAnalyse.editAnalyse);

export default router;