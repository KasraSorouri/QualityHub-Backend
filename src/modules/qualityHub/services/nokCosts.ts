import { Material, NokCost, NokDismantleMaterials, NokRework, Recipe } from '../../../models';
import { AnalyseCost } from '../types';
import { nokCostDataProcessor } from '../utils/nokCostProcessor';

// Get Dismantled Material By Nok Id
const getDismantledMaterialByNok = async (nokId: number): Promise<NokDismantleMaterials[]> => {
  try {
    const dismantledMaterial = await NokDismantleMaterials.findAll({
      where: { nokId },
      include: [
        {
          model: Material, 
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

// Calculate Costs For Nok Id
const calculateNokCost = async (nokId: number): Promise<AnalyseCost> => {

  try {
    let totalMaterialWaste: AnalyseCost = { } 
    let issue : boolean = false
    let claimStatus = {
      pendding: 0,
      approved: 0,
      rejected: 0
    }

    let dismantledMaterial = await NokDismantleMaterials.findAll({ where: { nokId: nokId}})
    // update unit price
    dismantledMaterial.forEach(async (item: NokDismantleMaterials) => {
      // if price = 0 read price from Material
      if (item.unitPrice == 0) {
        updateUnitPrice(item);
        issue = true;
      }

      // Calculate Total Cost
      const { materialStatus, actualDismantledQty, unitPrice } = item;
      const totalCost = actualDismantledQty * unitPrice;
      console.log('Cost Calculate *  calculation * qty: ', actualDismantledQty, ' material price: ', unitPrice, ' totalCost: ->', totalCost, ' status  ->', materialStatus, 'material Id :', item.materialId);

      if (totalMaterialWaste[materialStatus]) {
        totalMaterialWaste[materialStatus] += totalCost;
      } else {
        totalMaterialWaste[materialStatus] = totalCost;
      }

      // Analyse Clame Status
      if (item.materialStatus === 'CLAIMABLE' && item.claimStatus === 'PENDING') {
        claimStatus.pendding += 1;
      }
      if (item.materialStatus === 'CLAIMABLE' && item.claimStatus === 'ACCEPTED') {
        claimStatus.approved += 1;
      }
      if (item.materialStatus === 'CLAIMABLE' && item.claimStatus === 'REJECTED') {
        claimStatus.rejected += 1;
      }

    })

    totalMaterialWaste.issue = issue ? 1 : 0 ;
    console.log('##Cost Calculate *  totalMaterialWaste ->', totalMaterialWaste);

   
    return { ...totalMaterialWaste, ...claimStatus}
   
  } catch(err : unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    console.log('## ERROR * creqate cost ', errorMessage);
    
    throw new Error(errorMessage);
  }
}

// Update Price Data
const updateUnitPrice = async(dismantledMaterial: NokDismantleMaterials) => {
  
  // Find missed Price
  const material = await Material.findByPk(dismantledMaterial.materialId);
  dismantledMaterial.unitPrice = material?.price || 0
  await dismantledMaterial.save();
}
  

// Create a new Cost
const createNokCost = async (costData: unknown): Promise<NokCost> => {
  console.log('** * cost -> Raw data', costData);

  // test data
  const newCostData = await nokCostDataProcessor(costData);

  console.log('** * cost -> newCostData', newCostData);

  try {

    let totalMaterialWaste: { [key: string]: number } = {} 

    const data = await NokDismantleMaterials.findAll({ where: { nokId: newCostData.nokId}})

   data.forEach(async (dismantledMaterial: NokDismantleMaterials) => {
    const {materialStatus, materialId, actualDismantledQty} = dismantledMaterial;
    const material = await Material.findByPk(materialId);
    if ( material && material.price) {
    const totalCost = actualDismantledQty * (material?.price || 0) 

      if (totalMaterialWaste[materialStatus]) {
        totalMaterialWaste[materialStatus] += totalCost;
      } else {
      totalMaterialWaste[materialStatus] = totalCost;
      }
    } else {
      console.log('** * cost -> material not found', materialId);
    }
  })

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
      materialWaste: Object.values(totalMaterialWaste).reduce((sum, value) => sum + value, 0),
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
  calculateNokCost
  //updateCost,
}


