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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
const types_1 = require("../types");
const dataProcessor_1 = require("../utils/dataProcessor");
// Define Recipe query
const query = {
    attributes: { exclude: [] },
    include: [
        {
            model: models_1.Product,
            as: 'product',
            attributes: ['id', 'productName', 'productCode'],
        },
        {
            model: models_1.Station,
            as: 'station',
            attributes: ['id', 'stationName', 'stationCode'],
        },
        {
            model: models_1.RecipeBoms,
            as: 'recipeMaterials',
            attributes: ['id', 'qty', 'reusable'],
            include: [
                {
                    model: models_1.Material,
                    as: 'material',
                    attributes: ['id', 'itemShortName', 'itemLongName', 'itemCode', 'price', 'unit', 'traceable', 'active'],
                },
            ],
        },
    ],
};
// Get all Recipes
const getAllRecipes = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Taala 3');
    try {
        const recipes = yield models_1.Recipe.findAll(query);
        return recipes;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        console.log('**** error :', errorMessage);
        throw new Error(errorMessage);
    }
});
// Get a Recipe based on ID
const getRecipe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Taala 4');
    const recipe = yield models_1.Recipe.findByPk(id, query);
    if (!recipe) {
        throw new Error('the recipe not found');
    }
    return recipe;
});
// Get Recipes by product
const getRecipesByProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield models_1.Recipe.findAll(Object.assign({ where: { productId } }, query));
        return recipes;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        console.log('**** error :', errorMessage);
        throw new Error(errorMessage);
    }
});
// Create a new Recipe
const createRecipe = (recipeData) => __awaiter(void 0, void 0, void 0, function* () {
    const newRecipeData = (0, dataProcessor_1.recipeProcessor)(recipeData);
    try {
        const recipe = yield models_1.Recipe.create(newRecipeData);
        if (recipe.id && 'materialsData' in newRecipeData) {
            yield updateBoms(recipe.id, newRecipeData.materialsData);
        }
        return recipe;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update an Recipe
const updateRecipe = (id, recipeData) => __awaiter(void 0, void 0, void 0, function* () {
    const newRecipeData = (0, dataProcessor_1.recipeProcessor)(recipeData);
    try {
        const recipe = yield models_1.Recipe.findByPk(id);
        if (!recipe) {
            throw new Error('Recipe not found!');
        }
        yield updateBoms(recipe.id, newRecipeData.materialsData);
        const updatedRecipe = yield recipe.update(newRecipeData);
        return updatedRecipe;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
const updateBoms = (id, bomData) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield models_1.Recipe.findByPk(id);
    if (recipe) {
        // delete previous recipe Boms
        yield models_1.RecipeBoms.destroy({ where: { recipeId: recipe.id } });
        // create new recipe Boms
        const bom = [];
        for (const item of bomData) {
            bom.push({
                recipeId: recipe.id,
                materialId: item.materialId,
                qty: item.qty,
                reusable: item.reusable ? item.reusable : types_1.Reusable.NO,
            });
        }
        try {
            yield models_1.RecipeBoms.bulkCreate(bom);
            const result = yield models_1.Recipe.findByPk(id, query);
            if (!result) {
                throw new Error('Recipe not found!');
            }
            return result;
        }
        catch (err) {
            let errorMessage = '';
            if (err instanceof Error) {
                errorMessage += ' Error: ' + err.message;
            }
            console.log('**** error :', errorMessage);
            throw new Error(errorMessage);
        }
    }
    else {
        throw new Error('Recipe not found!');
    }
});
exports.default = {
    getAllRecipes,
    getRecipe,
    getRecipesByProduct,
    createRecipe,
    updateRecipe,
};
