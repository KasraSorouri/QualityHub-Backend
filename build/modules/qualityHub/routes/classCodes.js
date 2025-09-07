"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const classCodes_1 = __importDefault(require("../controllers/classCodes"));
const router = express_1.default.Router();
// Get ClassCodes
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', classCodes_1.default.getAllClassCodes);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', classCodes_1.default.getClassCode);
// Create ClassCode
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), classCodes_1.default.addClassCode);
// Edit ClassCode
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), classCodes_1.default.editClassCode);
exports.default = router;
