"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const nokCosts_1 = __importDefault(require("../controllers/nokCosts"));
const router = express_1.default.Router();
/*
// Get Nok Cost
// eslint-disable-next-line @typescript-eslint/no-misused-promises

router.get('/', nokCost.getAllCosts);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', nokCost.getCost);
*/
// get Dismantled Material by Nok Id
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/nok_material/nok/:id', nokCosts_1.default.getDismantledMaterialByNok);
// Create Rework
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), nokCosts_1.default.addCost);
// Edit Rework
// eslint-disable-next-line @typescript-eslint/no-misused-promises
//router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), nokCost.editCost);
exports.default = router;
