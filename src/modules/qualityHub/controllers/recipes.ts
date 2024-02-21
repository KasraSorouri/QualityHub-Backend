import recipeServices from '../services/recipes';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';


// Get All Recipes
const getAllRecipes = async (_req: Request, res: Response) => {
  try{
    const recipes = await recipeServices.getAllRecipes();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'No recipe found' });
  }
};


// Get a Recipe by Id
const getRecipe = async (req: ExtendedRequest, res: Response)=> {
  const id = req.params.id;
  try {
    const recipe = await recipeServices.getRecipe(Number(id));
    res.json(recipe);
  } catch (err) {
    res.status(404).json({ error: 'Recipe not found' });
  }
};

// Get Recipes by Product Id
const getRecipesByProduct = async (req: ExtendedRequest, res: Response) => {
  const productId = Number(req.params.id);
  if (!productId) {
    res.status(400).json({ error: 'Invalid product id' });
  }
  try {
    const recipes = await recipeServices.getRecipesByProduct(productId);
    res.json(recipes);
  } catch (err) {
    res.status(404).json({ error: 'No recipe found' });
  }
};

// Create a New Recipe
const addRecipe = async (req: ExtendedRequest, res: Response) => {
  const recipeData: unknown = req.body;
  try {
    const result = await recipeServices.createRecipe(recipeData);
    res.status(201).json(result);
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Edit an Existing Recipe
const editRecipe = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!(req.decodedToken && id === req.decodedToken.id || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const recipeData: unknown = req.body;
  try {
    const result = await recipeServices.updateRecipe(id,recipeData);
    res.status(201).json(result);
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

export default {
  getAllRecipes,
  getRecipe,
  getRecipesByProduct,
  addRecipe,
  editRecipe,
};