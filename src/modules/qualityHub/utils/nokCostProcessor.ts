import { parseId } from '../../../utils/dataValidator';
import { MaterialCost, NewNokCostsData } from '../types';

const nokCostDataProcessor = (nokCostsData: unknown): NewNokCostsData => {
  // Validate input data
  if (
    !nokCostsData ||
    typeof nokCostsData !== 'object' ||
    !('nokId' in nokCostsData) ||
    !('reworkId' in nokCostsData) ||
    !('dismantledMaterial' in nokCostsData)
  ) {
    throw new Error('Incorrect or missing Data ** NOK Cost * 0 *');
  }

  const nbokId: number = parseId(nokCostsData.nokId);
  const reworkId: number = parseId(nokCostsData.reworkId);

  if (!Array.isArray(nokCostsData.dismantledMaterial)) {
    throw new Error('Incorrect or missing Data ** NOK Cost * 1 *');
  }

  const materialCostData: MaterialCost[] = [];

  for (const item of nokCostsData.dismantledMaterial) {
    // Type guard to check if the item contains the required properties
    if (item && typeof item === 'object' && 'materialId' in item && 'unitPrice' in item) {
      const newItem: MaterialCost = {
        materialId: parseId(item.materialId),
        unitPrice: Number(item.unitPrice),
      };
      materialCostData.push(newItem);
    } else {
      throw new Error('Incorrect or missing Data ** NOK Cost');
    }
  }
  const newData: NewNokCostsData = {
    nokId: nbokId,
    reworkId: reworkId,
    dismantledMaterial: materialCostData,
  };
  return newData;
};
export { nokCostDataProcessor };
