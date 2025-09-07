import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import materialControllers from '../controllers/materials';

const router = express.Router();

// Get Materials
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', materialControllers.getAllMaterials);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', materialControllers.getMaterial);

// Create Material
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), materialControllers.addMaterial);

// Edit Material
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), materialControllers.editMaterial);

export default router;
