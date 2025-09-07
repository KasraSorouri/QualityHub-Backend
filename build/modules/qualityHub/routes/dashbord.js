"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const dashboard_1 = __importDefault(require("../controllers/dashboard"));
const router = express_1.default.Router();
// Get Dashboard Data
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/detected-nok', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['DASHBOARD']), dashboard_1.default.NokDashboardController);
// Get Analysed NOK Data
//prettier-ignore
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/analysed-nok', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['DASHBOARD']), dashboard_1.default.nokAnalysedDashboardController);
// Get Top NOK Data
//prettier-ignore
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/top-nok', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['DASHBOARD']), dashboard_1.default.NokDashboardControllerTopNok);
exports.default = router;
