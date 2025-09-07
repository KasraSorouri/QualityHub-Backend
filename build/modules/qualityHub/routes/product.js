"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const products_1 = __importDefault(require("../controllers/products"));
const router = express_1.default.Router();
// Get Products
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', products_1.default.getAllProducts);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', products_1.default.getProduct);
// Create Product
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), products_1.default.addProduct);
// Edit Product
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), products_1.default.editProduct);
exports.default = router;
