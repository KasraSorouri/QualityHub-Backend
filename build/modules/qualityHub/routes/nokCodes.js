"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const nokCodes_1 = __importDefault(require("../controllers/nokCodes"));
const router = express_1.default.Router();
// Get Nok Grpups
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', nokCodes_1.default.getAllNokCodes);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokCodes_1.default.getNokCode);
// Create NokCode
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), nokCodes_1.default.addNokCode);
// Edit NokCode
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), nokCodes_1.default.editNokCode);
exports.default = router;
