"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const workShifts_1 = __importDefault(require("../controllers/workShifts"));
const router = express_1.default.Router();
// Get WorkShifts
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', workShifts_1.default.getAllWorkShifts);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', workShifts_1.default.getWorkShift);
// Create WorkShift
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.roleAuthority)(['ADMIN']), workShifts_1.default.addWorkShift);
// Edit WorkShift
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.roleAuthority)(['ADMIN']), workShifts_1.default.editWorkShift);
exports.default = router;
