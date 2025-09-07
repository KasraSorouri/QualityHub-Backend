"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const nokDetects_1 = __importDefault(require("../controllers/nokDetects"));
const router = express_1.default.Router();
// Get NOK Detect
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', nokDetects_1.default.getAllNokDetects);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokDetects_1.default.getNokDetect);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/product/:id', nokDetects_1.default.getNokDetectsByProduct);
// Create NOK Detect
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), nokDetects_1.default.addNokDetect);
// Edit NOK Detect
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), nokDetects_1.default.editNokDetect);
exports.default = router;
