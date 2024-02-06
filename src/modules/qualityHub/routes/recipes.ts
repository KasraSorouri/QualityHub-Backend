import express from 'express';

import { tokenExtractor, rightAuthority } from '../../usersAndAuthentication/utils/midwares';

import recipeControllers from '../controllers/recipes';

const router = express.Router();

// Get Recipes
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', recipeControllers.getAllRecipes);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', recipeControllers.getRecipe);

// Create Recipe
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', tokenExtractor, rightAuthority(['PRODUCT-ADD']), recipeControllers.addRecipe);

// Edit Recipe
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', tokenExtractor, rightAuthority(['PRODUCT-ADD']), recipeControllers.editRecipe);


export default router;