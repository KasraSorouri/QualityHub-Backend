import { Recipe, Product, RecipeQuery, Station, RecipeBoms, Material } from '../../../models';
import { ConsumingMaterial, RecipeBomData, RecipeData } from '../types';
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
          as: 'materials',
          attributes: ['id', 'itemShortName', 'itemCode'],
        },
      ],
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

  console.log('** recipe ** service * create * new Recipe data ->', newRecipeData);
  
  try {
    const recipe = await Recipe.create(newRecipeData);
    if (recipe.id && 'materialsData' in newRecipeData) {
      await updateBoms(recipe.id, newRecipeData.materialsData);
    }
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

const updateBoms = async (id: number, bomData: ConsumingMaterial[]): Promise<Recipe> => {
  const recipe = await Recipe.findByPk(id);
  if(recipe) {
  
  console.log(' **** Recipe * service ** upbade Bom * recipe id: ', recipe.id,  '*** bom data -> ',bomData);
  
  // delete previous recipe Boms 
  await RecipeBoms.destroy({ where: { 'recipeId' : recipe.id}})

  // create new recipe Boms
  let bom : RecipeBomData[] = []

  for (const item of bomData) {
    
    bom.push({recipeId: recipe.id, materialId: item.materialId, qty: item.qty, reusable: item.reusable ? item.reusable : false }) 
  }
  try {
    const updatedRecipe = await RecipeBoms.bulkCreate(bom);
    
    console.log('**** updatedRecipe ****', updatedRecipe);

    const result = await Recipe.findByPk(id, query);

    if (!result) {
      throw new Error('Recipe not found!');
    }
    return result;
  } catch(err : unknown) {
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
}
export default {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
}