import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import stationControllers from '../controllers/stations';

const router = express.Router();

// Get Stations
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', stationControllers.getAllStations);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', stationControllers.getStation);

// Create Station
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), stationControllers.addStation);

// Edit Station
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT_EDIT']), stationControllers.editStation);


export default router;