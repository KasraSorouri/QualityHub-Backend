"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const iqcManager_1 = __importDefault(require("../controllers/iqcManager"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const router = express_1.default.Router();
// get All IQCs
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', iqcManager_1.default.getAllIQCs);
// Get Penging IQCs
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/pending', iqcManager_1.default.getPendingIQCs);
// Update Material Status
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), iqcManager_1.default.updateMaterialStatus);
exports.default = router;
