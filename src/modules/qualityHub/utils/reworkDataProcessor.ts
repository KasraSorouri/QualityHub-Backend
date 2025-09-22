import { parseDate, parseId } from '../../../utils/dataValidator';
import { NewReworkData, NewRwDismantledMaterialData } from '../types';
import { parseActive, parseDescription, parseOrder, parseQty } from './dataProcessor';

const parseRecipeData = (recipeData: unknown): number[] => {
  if (!recipeData || !Array.isArray(recipeData)) {
    throw new Error('Incorrect or missing Data!');
  }
  const recipeIds: number[] = [];
  for (const recipe of recipeData) {
    recipeIds.push(parseId(recipe));
  }
  return recipeIds;
};

const parseDismantlesMaterial = (dismantlesMaterialData: unknown): NewRwDismantledMaterialData[] => {
  if (!dismantlesMaterialData || !Array.isArray(dismantlesMaterialData)) {
    throw new Error('Incorrect or missing Data!');
  }
  const dismantledMaterials: NewRwDismantledMaterialData[] = [];
  for (const dismantledItem of dismantlesMaterialData) {
    if (!dismantledItem || typeof dismantledItem !== 'object') {
      throw new Error('Incorrect or missing Data!');
    }
    if (
      'recipeBom' in dismantledItem &&
      typeof dismantledItem.recipeBom === 'object' &&
      'dismantledQty' in dismantledItem
    ) {
      const dismantledmaterial = {
        recipeBomId: parseId(dismantledItem.recipeBom.id),
        dismantledQty: parseQty(dismantledItem.dismantledQty),
        note: 'note' in dismantledItem ? parseDescription(dismantledItem.note) : '',
        mandatoryRemove: 'mandatoryRemove' in dismantledItem ? parseActive(dismantledItem.mandatoryRemove) : false,
      };
      dismantledMaterials.push(dismantledmaterial);
    } else {
      throw new Error('Incorrect or missing Data!');
    }
  }
  return dismantledMaterials;
};

const reworkDataProcessor = (reworkData: unknown): NewReworkData => {
  if (!reworkData || typeof reworkData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if (
    'productId' in reworkData &&
    'stationId' in reworkData &&
    'nokCodeId' in reworkData &&
    'reworkShortDesc' in reworkData &&
    'order' in reworkData
  ) {
    const reworkDataToReturn: NewReworkData = {
      productId: parseId(reworkData.productId),
      stationId: parseId(reworkData.stationId),
      nokCodeId: parseId(reworkData.nokCodeId),
      reworkShortDesc: parseDescription(reworkData.reworkShortDesc),
      description: 'description' in reworkData ? parseDescription(reworkData.description) : '',
      order: parseOrder(Number(reworkData.order)),
      timeDuration: 'timeDuration' in reworkData ? parseQty(reworkData.timeDuration) : 0,
      active: 'active' in reworkData ? parseActive(reworkData.active) : true,
      deprecated: 'deprecated' in reworkData ? parseActive(reworkData.deprecated) : false,
      reworkRecipes: 'reworkRecipes' in reworkData ? parseRecipeData(reworkData.reworkRecipes) : [],
      affectedRecipes: 'affectedRecipes' in reworkData ? parseRecipeData(reworkData.affectedRecipes) : [],
      creationDate: new Date(),
      deprecatedDate: 'deprecatedDate' in reworkData ? parseDate(reworkData.deprecatedDate) : undefined,
      dismantledMaterials:
        'rwDismantledMaterials' in reworkData ? parseDismantlesMaterial(reworkData.rwDismantledMaterials) : [],
    };
    return reworkDataToReturn;
  } else {
    throw new Error('Incorrect or missing data!');
  }
};

export { reworkDataProcessor };
