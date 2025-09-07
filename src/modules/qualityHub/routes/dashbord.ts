import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';
import dashboardController from '../controllers/dashboard';

const router = express.Router();

// Get Dashboard Data
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/detected-nok', tokenExtractor, rightAuthority(['DASHBOARD']), dashboardController.NokDashboardController);

// Get Analysed NOK Data
//prettier-ignore
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/analysed-nok', tokenExtractor, rightAuthority(['DASHBOARD']), dashboardController.nokAnalysedDashboardController);

// Get Top NOK Data
//prettier-ignore
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/top-nok', tokenExtractor, rightAuthority(['DASHBOARD']), dashboardController.NokDashboardControllerTopNok);
export default router;
