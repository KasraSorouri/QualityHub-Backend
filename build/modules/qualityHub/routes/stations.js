"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const stations_1 = __importDefault(require("../controllers/stations"));
const router = express_1.default.Router();
// Get Stations
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', stations_1.default.getAllStations);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', stations_1.default.getStation);
// Create Station
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), stations_1.default.addStation);
// Edit Station
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), stations_1.default.editStation);
exports.default = router;
