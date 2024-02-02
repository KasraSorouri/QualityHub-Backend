import { Recipe, Product, RecipeQuery, Station } from '../../../models';
import { RecipeData } from '../types';
import { recipeProcessor } from '../utils/dataProcessor';

// Define Recipe query 
const query: RecipeQuery = {
  attributes: { exclude: ['productId', 'stationId'] },
  include: [
    {
      model: Product,
      as: 'product',
      attributes: ['id', 'productName', 'productCode'],
    },
    {
      model: Station,
      as: 'station',
      attributes: ['id', 'stationName', 'stationCode'],
    }

  ]
};


// Get all Recipes
const getAllRecipes = async(): Promise<Recipe[]> => {

  try {
    const recipes = await Recipe.findAll(query);
    return recipes;
  } catch (err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
};

// Get a Recipe based on ID
const getRecipe = async(id: number): Promise<Recipe> => {
  const recipe = await Recipe.findByPk(id,query);
 
  if (!recipe) {
    throw new Error ('the recipe not found');
  }
  return recipe;
};

// Create a new Recipe
const createRecipe = async (recipeData: unknown): Promise<Recipe> => {

  const newRecipeData : RecipeData = await recipeProcessor(recipeData);

  try {
    const recipe = await Recipe.create(newRecipeData);
    return recipe;
  } catch(err : unknown) {
      let errorMessage = '';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    }
};

// Update an Recipe
const updateRecipe = async (id: number, recipeData: unknown): Promise<Recipe>=> {  
  
  const newRecipeData = await recipeProcessor(recipeData);

  try {
    const recipe = await Recipe.findByPk(id);
    if(!recipe) {
      throw new Error('Recipe not found!');
    }
    const updatedRecipe = await recipe.update(newRecipeData);
    return updatedRecipe;
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
};