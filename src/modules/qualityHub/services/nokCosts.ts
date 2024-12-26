import { Material, NokCost, NokDismantleMaterials, NokRework, Recipe } from '../../../models';
import { nokCostDataProcessor } from '../utils/nokCostProcessor';


/*

// Get all Costs
const getAllCosts = async(): Promise<NokCost[]> => {
  try {
    const costs = await NokCost.findAll();
    console.log('costs -> ', costs);

    return costs;
  } catch (err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
};

// Get a Cost based on ID
const getCost = async(id: number): Promise<NokCost> => {
  const cost = await NokCost.findByPk(id);
  console.log('cost by id -> ', cost);
  
 
  if (!cost) {
    throw new Error ('the cost not found');
  }
  return cost;
};

*/
// Get Costs by product
const getDismantledMaterialByNok = async (nokId: number): Promise<NokDismantleMaterials[]> => {
  try {
    const dismantledMaterial = await NokDismantleMaterials.findAll({
      where: { nokId },
      include: [
        {
          model: Material, // The associated model for materials
        },
      ]});

    console.log(' cost by product ->', dismantledMaterial);
    
    return dismantledMaterial;
  } catch (err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('**** error :', errorMessage);
    throw new Error(errorMessage);
  }
}


// Create a new Cost
const createNokCost = async (costData: unknown): Promise<NokCost> => {
  console.log('** * cost -> Raw data', costData);

  // test data
  const newCostData = await nokCostDataProcessor(costData);

  console.log('** * cost -> newCostData', newCostData);

  try {

    let totalMaterialWaste: number = 0

    // Update Dismantled Material Cost and Calculate Total Material Waste
    for (const item of newCostData.dismantledMaterial) {
      const data = await NokDismantleMaterials.findByPk(item.materialId)
      if (data) {
        data.unitPrice = item.unitPrice
        data.save()
        totalMaterialWaste += data.qty * item.unitPrice
      }
    }

    // Calculate Time Waste
    let totalTimeWaste: number = 0

    // find rework
    const rework = await NokRework.findByPk(newCostData.reworkId)
    if (rework) {
      // find recipes and calculate total time Waste
      for (const affectedRecipe of rework.affectedRecipes) {
        const recipe = await Recipe.findByPk(affectedRecipe)
        if (recipe) {
          totalTimeWaste += recipe.timeDuration? recipe.timeDuration : 0
        }
      }
    }

          
    console.log('** Material Waste : ', totalMaterialWaste);

    const nokCost ={
      nokId: newCostData.nokId,
      reworkId: newCostData.reworkId,
      materialWaste: totalMaterialWaste,
      timeWaste: totalTimeWaste,
      editLocked: false,
      updatedAt: new Date(),
    }

    console.log('** nokCost -> : ', nokCost);

    const result = await NokCost.create(nokCost)
   

    console.log('** result -> : ', result);

    
    return result
   
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('## ERROR * creqate cost ', errorMessage);
    
    throw new Error(errorMessage);
  }
}


export default {
  //getAllCosts,
  //getCost,
  //getCostsByNok,
  getDismantledMaterialByNok,
  createNokCost,
  //updateCost,
}


