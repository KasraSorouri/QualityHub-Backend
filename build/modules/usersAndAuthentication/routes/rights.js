"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rights_1 = __importDefault(require("../controllers/rights"));
const midwares_1 = require("../utils/midwares");
const router = express_1.default.Router();
// Get Rights
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', rights_1.default.getAllRights);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', rights_1.default.getRight);
// Create Right
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.roleAuthority)(['ADMIN']), rights_1.default.addRight);
// Edit Right
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.roleAuthority)(['ADMIN']), rights_1.default.editRight);
exports.default = router;
