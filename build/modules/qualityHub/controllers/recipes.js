"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipes_1 = __importDefault(require("../services/recipes"));
// Get All Recipes
const getAllRecipes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipes_1.default.getAllRecipes();
        res.json(recipes);
    }
    catch (err) {
        res.status(500).json({ error: 'No recipe found' });
    }
});
// Get a Recipe by Id
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const recipe = yield recipes_1.default.getRecipe(Number(id));
        res.json(recipe);
    }
    catch (err) {
        res.status(404).json({ error: 'Recipe not found' });
    }
});
// Get Recipes by Product Id
const getRecipesByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = Number(req.params.id);
    if (!productId) {
        res.status(400).json({ error: 'Invalid product id' });
    }
    try {
        const recipes = yield recipes_1.default.getRecipesByProduct(productId);
        res.json(recipes);
    }
    catch (err) {
        res.status(404).json({ error: 'No recipe found' });
    }
});
// Create a New Recipe
const addRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeData = req.body;
    try {
        const result = yield recipes_1.default.createRecipe(recipeData);
        res.status(201).json(result);
    }
    catch (err) {
        let errorMessage = 'Something went wrong.';
        if (err instanceof Error) {
            errorMessage += err.message;
        }
        res.status(409).json({ error: `${errorMessage}` });
    }
});
// Edit an Existing Recipe
const editRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
        res.status(401).json({ error: 'Operation not allowed' });
    }
    const recipeData = req.body;
    try {
        const result = yield recipes_1.default.updateRecipe(id, recipeData);
        res.status(201).json(result);
    }
    catch (err) {
        let errorMessage = 'Something went wrong.';
        if (err instanceof Error) {
            errorMessage += err.message;
        }
        res.status(409).json({ error: `${errorMessage}` });
    }
});
exports.default = {
    getAllRecipes,
    getRecipe,
    getRecipesByProduct,
    addRecipe,
    editRecipe,
};
