"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const nokGrps_1 = __importDefault(require("../controllers/nokGrps"));
const router = express_1.default.Router();
// Get Nok Grpups
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', nokGrps_1.default.getAllNokGrps);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokGrps_1.default.getNokGrp);
// Create NokGrp
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), nokGrps_1.default.addNokGrp);
// Edit NokGrp
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), nokGrps_1.default.editNokGrp);
exports.default = router;
