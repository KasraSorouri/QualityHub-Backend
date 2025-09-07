"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const nokRCAs_1 = __importDefault(require("../controllers/nokRCAs"));
const router = express_1.default.Router();
// Get Nok Rca
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', nokRCAs_1.default.getAllRcas);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokRCAs_1.default.getRca);
// get NOk RCAs by Nok Id
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/nok/:id', nokRCAs_1.default.getNokRcaByNok);
// Create | Update a RCA
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), nokRCAs_1.default.addRca);
// Remove a RCA
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.delete('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), nokRCAs_1.default.deleteRca);
exports.default = router;
