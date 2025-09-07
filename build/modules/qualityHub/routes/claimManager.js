"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const claimManager_1 = __importDefault(require("../controllers/claimManager"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const router = express_1.default.Router();
// Get Claims
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', claimManager_1.default.getAllClaims);
// Get Pending Claims
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/pending', claimManager_1.default.getPendingClaims);
// Update Claim Status
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), claimManager_1.default.updateClaimStatus);
exports.default = router;
