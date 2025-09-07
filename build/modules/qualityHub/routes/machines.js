"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const machines_1 = __importDefault(require("../controllers/machines"));
const router = express_1.default.Router();
// Get Machines
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', machines_1.default.getAllMachines);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', machines_1.default.getMachine);
// Create Machine
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), machines_1.default.addMachine);
// Edit Machine
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), machines_1.default.editMachine);
exports.default = router;
