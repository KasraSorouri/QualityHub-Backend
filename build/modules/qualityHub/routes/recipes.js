"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midwares_1 = require("../../usersAndAuthentication/utils/midwares");
const recipes_1 = __importDefault(require("../controllers/recipes"));
const router = express_1.default.Router();
// Get Recipes
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', recipes_1.default.getAllRecipes);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', recipes_1.default.getRecipe);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/product/:id', recipes_1.default.getRecipesByProduct);
// Create Recipe
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), recipes_1.default.addRecipe);
// Edit Recipe
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', midwares_1.tokenExtractor, (0, midwares_1.rightAuthority)(['PRODUCT-ADD']), recipes_1.default.editRecipe);
exports.default = router;
