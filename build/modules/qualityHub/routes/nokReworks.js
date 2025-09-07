"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const nokReworks_1 = __importDefault(require("../controllers/nokReworks"));
const router = express_1.default.Router();
// Get Reworks
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', nokReworks_1.default.getAllReworks);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokReworks_1.default.getRework);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/nok/:id', nokReworks_1.default.getReworksByNok);
// Create Rework
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), nokReworks_1.default.addRework);
// Edit Rework
// eslint-disable-next-line @typescript-eslint/no-misused-promises
//router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), reworkControllers.editRework);
exports.default = router;
