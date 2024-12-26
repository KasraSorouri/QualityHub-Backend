import { parseId } from "../../../utils/dataValidator";
import { MaterialCost, NewNokCostsData } from "../types";

const nokCostDataProcessor = async (nokCostsData: unknown): Promise<NewNokCostsData> => {
  // Validate input data
   if (!nokCostsData || 
    typeof nokCostsData !== 'object' || 
    !('nokId' in nokCostsData) ||
    !('reworkId' in nokCostsData) ||
    !('dismantledMaterial' in nokCostsData)) {
    console.log('Incorrect or missing Data ** NOK Cost * 0 *');
    throw new Error('Incorrect or missing Data ** NOK Cost * 0 *');
  }

  const nbokId : number =  parseId((nokCostsData.nokId as any));
  const reworkId : number =  parseId((nokCostsData.reworkId as any));

  
  if (!Array.isArray(nokCostsData.dismantledMaterial)) {
    console.log('Incorrect or missing Data ** NOK Cost * 1 *');
    throw new Error('Incorrect or missing Data ** NOK Cost * 1 *');
  }
 
  const materialCostData: MaterialCost[] = [] ;

  for (const item of nokCostsData.dismantledMaterial) {
    console.log('** here ** ');
    console.log('NOk Cost Processing * item -> ', item);

    // Type guard to check if the item contains the required properties
    if (
      item &&
      typeof item === 'object' &&
      'materialId' in item &&
      'unitPrice' in item
    ) {
      const newItem: MaterialCost = {
        materialId: parseId((item as any).materialId),
        unitPrice: Number(item.unitPrice),
      };
      materialCostData.push(newItem);
    } else {
      console.log('*Nok Costs Data Processing - Invalid Item', item);
    }
  }
  const newData: NewNokCostsData = {
    nokId: nbokId,
    reworkId: reworkId,
    dismantledMaterial: materialCostData,
  };
  console.log('NOk Cost Processing Finish Successfully!');
  
  return newData;
};
export {
  nokCostDataProcessor,
}