import { Material, NokCost, NokDismantleMaterials, NokRework, Recipe } from '../../../models';
import { AnalyseCost, ClaimStatus, MaterialStatus } from '../types';
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
      ],
    });

    return dismantledMaterial;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Calculate Costs For Nok Id
const calculateNokCost = async (nokId: number): Promise<AnalyseCost> => {
  try {
    const totalMaterialWaste: AnalyseCost = {};
    let issue: boolean = false;
    const claimStatus = {
      pendding: 0,
      approved: 0,
      rejected: 0,
    };

    const dismantledMaterial = await NokDismantleMaterials.findAll({
      where: { nokId: nokId },
    });
    // update unit price
    for (const item of dismantledMaterial) {
      if (item.unitPrice == 0) {
        await updateUnitPrice(item);
        issue = true;
      }

      // Calculate Total Cost
      const { materialStatus, actualDismantledQty, unitPrice } = item;
      const totalCost = actualDismantledQty * unitPrice;

      if (totalMaterialWaste[materialStatus]) {
        totalMaterialWaste[materialStatus] += totalCost;
      } else {
        totalMaterialWaste[materialStatus] = totalCost;
      }

      // Analyse Clame Status
      if (item.materialStatus === MaterialStatus.CLAIMABLE && item.claimStatus === ClaimStatus.PENDING) {
        claimStatus.pendding += 1;
      }
      if (item.materialStatus === MaterialStatus.CLAIMABLE && item.claimStatus === ClaimStatus.ACCEPTED) {
        claimStatus.approved += 1;
      }
      if (item.materialStatus === MaterialStatus.CLAIMABLE && item.claimStatus === ClaimStatus.DENIED) {
        claimStatus.rejected += 1;
      }
    }

    totalMaterialWaste.issue = issue ? 1 : 0;

    return { ...totalMaterialWaste, ...claimStatus };
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Update Price Data
const updateUnitPrice = async (dismantledMaterial: NokDismantleMaterials) => {
  // Find missed Price
  const material = await Material.findByPk(dismantledMaterial.materialId);
  dismantledMaterial.unitPrice = material?.price || 0;
  await dismantledMaterial.save();
};

// Create a new Cost
const createNokCost = async (costData: unknown): Promise<NokCost> => {
  // test data
  const newCostData = nokCostDataProcessor(costData);

  try {
    const totalMaterialWaste: { [key: string]: number } = {};

    const data = await NokDismantleMaterials.findAll({
      where: { nokId: newCostData.nokId },
    });

    // Calculate Material Waste
    for (const dismantledMaterial of data) {
      const { materialStatus, materialId, actualDismantledQty } = dismantledMaterial;
      const material = await Material.findByPk(materialId);

      if (material && material.price) {
        const totalCost = actualDismantledQty * (material?.price || 0);

        if (totalMaterialWaste[materialStatus]) {
          totalMaterialWaste[materialStatus] += totalCost;
        } else {
          totalMaterialWaste[materialStatus] = totalCost;
        }
      } else {
        throw new Error('Material not found for id ' + materialId);
      }
    }

    // Calculate Time Waste
    let totalTimeWaste: number = 0;

    // find rework
    const rework = await NokRework.findByPk(newCostData.reworkId);
    if (rework) {
      // find recipes and calculate total time Waste
      for (const affectedRecipe of rework.affectedRecipes) {
        const recipe = await Recipe.findByPk(affectedRecipe);
        if (recipe) {
          totalTimeWaste += recipe.timeDuration ? recipe.timeDuration : 0;
        }
      }
    }

    const nokCost = {
      nokId: newCostData.nokId,
      reworkId: newCostData.reworkId,
      materialWaste: Object.values(totalMaterialWaste).reduce((sum, value) => sum + value, 0),
      timeWaste: totalTimeWaste,
      editLocked: false,
      updatedAt: new Date(),
    };

    const result = await NokCost.create(nokCost);

    return result;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }

    throw new Error(errorMessage);
  }
};

export default {
  //getAllCosts,
  //getCost,
  //getCostsByNok,
  getDismantledMaterialByNok,
  createNokCost,
  calculateNokCost,
  //updateCost,
};
