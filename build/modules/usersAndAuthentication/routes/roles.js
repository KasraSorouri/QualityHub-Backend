"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roles_1 = __importDefault(require("../controllers/roles"));
const midwares_1 = require("../utils/midwares");
const router = express_1.default.Router();
// Get Roles
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', roles_1.default.getAllRoles);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', roles_1.default.getRole);
// Create Role
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.roleAuthority)(['ADMIN']), roles_1.default.addRole);
// Edit Role
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.roleAuthority)(['ADMIN']), roles_1.default.editRole);
exports.default = router;
