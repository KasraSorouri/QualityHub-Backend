"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const productGrps_1 = __importDefault(require("../controllers/productGrps"));
const router = express_1.default.Router();
// Get Product Grpups
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', productGrps_1.default.getAllProductGrps);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', productGrps_1.default.getProductGrp);
// Create ProductGrp
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), productGrps_1.default.addProductGrp);
// Edit ProductGrp
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), productGrps_1.default.editProductGrp);
exports.default = router;
