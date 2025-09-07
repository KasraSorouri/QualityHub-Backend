import express from 'express';

import roleControllers from '../controllers/roles';
import { tokenExtractor, roleAuthority } from '../utils/midwares';

const router = express.Router();

// Get Roles
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', roleControllers.getAllRoles);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', roleControllers.getRole);

// Create Role
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, roleAuthority(['ADMIN']), roleControllers.addRole);

// Edit Role
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, roleAuthority(['ADMIN']), roleControllers.editRole);

export default router;
