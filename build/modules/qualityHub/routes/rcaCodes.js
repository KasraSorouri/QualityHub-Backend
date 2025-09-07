"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const rcaCodes_1 = __importDefault(require("../controllers/rcaCodes"));
const router = express_1.default.Router();
// Get RcaCodes
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', rcaCodes_1.default.getAllRcaCodes);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', rcaCodes_1.default.getRcaCode);
// Create RcaCode
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), rcaCodes_1.default.addRcaCode);
// Edit RcaCode
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), rcaCodes_1.default.editRcaCode);
exports.default = router;
