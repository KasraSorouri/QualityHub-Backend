"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const reworks_1 = __importDefault(require("../controllers/reworks"));
const router = express_1.default.Router();
// Get Reworks
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', reworks_1.default.getAllReworks);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', reworks_1.default.getRework);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/product/:id', reworks_1.default.getReworksByProduct);
// Create Rework
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), reworks_1.default.addRework);
// Edit Rework
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), reworks_1.default.editRework);
exports.default = router;
