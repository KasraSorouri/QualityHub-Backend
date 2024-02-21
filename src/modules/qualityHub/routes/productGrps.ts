import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import productControllers from '../controllers/productGrps';

const router = express.Router();

// Get Product Grpups
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', productControllers.getAllProductGrps);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', productControllers.getProductGrp);

// Create ProductGrp
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), productControllers.addProductGrp);

// Edit ProductGrp
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), productControllers.editProductGrp);


export default router;