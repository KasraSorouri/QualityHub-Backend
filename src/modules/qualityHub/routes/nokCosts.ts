import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import nokCost from '../controllers/nokCosts';

const router = express.Router();

/*
// Get Nok Cost
// eslint-disable-next-line @typescript-eslint/no-misused-promises

router.get('/', nokCost.getAllCosts);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokCost.getCost);
*/

// get Dismantled Material by Nok Id
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/nok_material/nok/:id', nokCost.getDismantledMaterialByNok);

// Create Rework
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokCost.addCost);

// Edit Rework
// eslint-disable-next-line @typescript-eslint/no-misused-promises
//router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokCost.editCost);

export default router;
