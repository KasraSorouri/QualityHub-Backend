"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const nokAnalyses_1 = __importDefault(require("../controllers/nokAnalyses"));
const router = express_1.default.Router();
/*
// Get Nok Analyse
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', nokAnalyse.getAllAnalyses);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokAnalyse.getAnalyse);
*/
// get Analyse by Nok Id
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/nok/:id', nokAnalyses_1.default.getNokAnalyseByNok);
// Create Analyse
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), nokAnalyses_1.default.addAnalyse);
// Set NOK Analyse is Done
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/status/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), nokAnalyses_1.default.updateAnalyseStatue);
// Edit Rework
// eslint-disable-next-line @typescript-eslint/no-misused-promises
//router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokAnalyse.editAnalyse);
exports.default = router;
