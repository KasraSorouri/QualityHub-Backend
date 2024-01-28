import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import productControllers from '../controllers/products';

const router = express.Router();

// Get Products
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', productControllers.getAllProducts);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', productControllers.getProduct);

// Create Product
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), productControllers.addProduct);

// Edit Product
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT_EDIT']), productControllers.editProduct);


export default router;