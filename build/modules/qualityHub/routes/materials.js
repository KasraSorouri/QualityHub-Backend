"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const materials_1 = __importDefault(require("../controllers/materials"));
const router = express_1.default.Router();
// Get Materials
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', materials_1.default.getAllMaterials);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', materials_1.default.getMaterial);
// Create Material
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), materials_1.default.addMaterial);
// Edit Material
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), materials_1.default.editMaterial);
exports.default = router;
