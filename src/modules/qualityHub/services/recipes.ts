import { Recipe, Product, RecipeQuery, Station, RecipeBoms, Material } from '../../../models';
import { ConsumingMaterial, RecipeBomData, RecipeData, Reusable } from '../types';
import { recipeProcessor } from '../utils/dataProcessor';

// Define Recipe query
const query: RecipeQuery = {
  attributes: { exclude: [] },
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
    },
    {
      model: RecipeBoms,
      as: 'recipeMaterials',
      attributes: ['id', 'qty', 'reusable'],
      include: [
        {
          model: Material,
          as: 'material',
          attributes: ['id', 'itemShortName', 'itemLongName', 'itemCode', 'price', 'unit', 'traceable', 'active'],
        },
      ],
    },
  ],
};

// Get all Recipes
const getAllRecipes = async (): Promise<Recipe[]> => {
  console.log('Taala 3');

  try {
    const recipes = await Recipe.findAll(query);
    return recipes;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
};

// Get a Recipe based on ID
const getRecipe = async (id: number): Promise<Recipe> => {
  console.log('Taala 4');

  const recipe = await Recipe.findByPk(id, query);

  if (!recipe) {
    throw new Error('the recipe not found');
  }
  return recipe;
};

// Get Recipes by product
const getRecipesByProduct = async (productId: number): Promise<Recipe[]> => {
  try {
    const recipes = await Recipe.findAll({
      where: { productId },
      ...query,
    });

    return recipes;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
};

// Create a new Recipe
const createRecipe = async (recipeData: unknown): Promise<Recipe> => {
  const newRecipeData: RecipeData = recipeProcessor(recipeData);

  try {
    const recipe = await Recipe.create(newRecipeData);
    if (recipe.id && 'materialsData' in newRecipeData) {
      await updateBoms(recipe.id, newRecipeData.materialsData);
    }
    return recipe;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Update an Recipe
const updateRecipe = async (id: number, recipeData: unknown): Promise<Recipe> => {
  const newRecipeData = recipeProcessor(recipeData);

  try {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      throw new Error('Recipe not found!');
    }
    await updateBoms(recipe.id, newRecipeData.materialsData);
    const updatedRecipe = await recipe.update(newRecipeData);
    return updatedRecipe;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

const updateBoms = async (id: number, bomData: ConsumingMaterial[]): Promise<Recipe> => {
  const recipe = await Recipe.findByPk(id);

  if (recipe) {
    // delete previous recipe Boms
    await RecipeBoms.destroy({ where: { recipeId: recipe.id } });

    // create new recipe Boms
    const bom: RecipeBomData[] = [];

    for (const item of bomData) {
      bom.push({
        recipeId: recipe.id,
        materialId: item.materialId,
        qty: item.qty,
        reusable: item.reusable ? item.reusable : Reusable.NO,
      });
    }
    try {
      await RecipeBoms.bulkCreate(bom);

      const result = await Recipe.findByPk(id, query);

      if (!result) {
        throw new Error('Recipe not found!');
      }
      return result;
    } catch (err: unknown) {
      let errorMessage = '';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      console.log('**** error :', errorMessage);

      throw new Error(errorMessage);
    }
  } else {
    throw new Error('Recipe not found!');
  }
};
export default {
  getAllRecipes,
  getRecipe,
  getRecipesByProduct,
  createRecipe,
  updateRecipe,
};
