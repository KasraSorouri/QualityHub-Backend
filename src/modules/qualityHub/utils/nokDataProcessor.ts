import { isString, parseId, parseDate, parseBoolean } from '../../../utils/dataValidator';
import {
  DismantledMaterialData,
  MaterialStatus,
  NewNokData,
  NokReworkData,
  NokStatus,
  ProductStatus,
  Reusable,
  ReworkStatus,
} from '../types';
import { parseDescription, parseQty } from './dataProcessor';

const parseProductSN = (productSN: unknown): string => {
  if (!productSN || !isString(productSN)) {
    throw new Error('Incorrect or missing productSN!');
  }
  return productSN;
};

const parseNokStatus = (nokStatus: unknown): NokStatus => {
  if (!isString(nokStatus)) {
    throw new Error('Incorrect or missing data 10!');
  }
  switch (nokStatus) {
    case 'PENDING':
      return NokStatus.PENDING;
    case 'ANALYSED':
      return NokStatus.ANALYSED;
    case 'NEED INVESTIGATION':
      return NokStatus.NEED_INVESTIGATION;
    case 'NOT FOUND':
      return NokStatus.NOT_FOUND;
    default:
      throw new Error('Incorrect or missing data ++!');
  }
};

const parseProductStatus = (productStatus: unknown): ProductStatus => {
  if (!isString(productStatus)) {
    throw new Error('Incorrect or missing data 11!');
  }
  switch (productStatus) {
    case 'NOK':
      return ProductStatus.NOK;
    case 'REWORKED':
      return ProductStatus.REWORKED;
    case 'SCRAPPED':
      return ProductStatus.SCRAPPED;
    default:
      throw new Error('Incorrect or missing data! -11--');
  }
};

const parseReworkStatus = (reworkStatus: unknown): ReworkStatus => {
  if (!isString(reworkStatus)) {
    throw new Error('Incorrect or missing data 12!');
  }
  switch (reworkStatus) {
    case 'PENDING':
      return ReworkStatus.PENDING;
    case 'IN_PROGRESS':
      return ReworkStatus.IN_PROGRESS;
    case 'POSTPONED':
      return ReworkStatus.POSTPONED;
    case 'COMPLETED':
      return ReworkStatus.COMPLETED;
    case 'CANCELLED':
      return ReworkStatus.CANCELLED;

    default:
      throw new Error('Incorrect or missing data');
  }
};

const parseMaterialStatus = (materialStatus: unknown): MaterialStatus => {
  if (!isString(materialStatus)) {
    throw new Error('Incorrect or missing data!');
  }
  switch (materialStatus) {
    case 'SCRAPPED':
      return MaterialStatus.SCRAPPED;
    case 'OK':
      return MaterialStatus.OK;
    case 'IQC':
      return MaterialStatus.IQC;
    case 'CLAIMABLE':
      return MaterialStatus.CLAIMABLE;
    default:
      throw new Error('Incorrect or missing data -13--');
  }
};

const parseReusable = (reusable: unknown): Reusable => {
  if (!isString(reusable)) {
    throw new Error('Incorrect or missing data 14!');
  }
  switch (reusable) {
    case 'YES':
      return Reusable.YES;
    case 'NO':
      return Reusable.NO;
    case 'IQC':
      return Reusable.IQC;
    default:
      throw new Error('Incorrect or missing data -14--');
  }
};

const parseNokDismantledMaterial = (dismantledMaterialData: unknown): DismantledMaterialData[] => {
  if (!dismantledMaterialData || !Array.isArray(dismantledMaterialData)) {
    throw new Error('Incorrect or missing Data!');
  }
  const dismantledMaterials: DismantledMaterialData[] = [];
  for (const dismantledItem of dismantledMaterialData) {
    if (!dismantledItem || typeof dismantledItem !== 'object') {
      throw new Error('Incorrect or missing Data!');
    }
    if ('material' in dismantledItem && 'actualDismantledQty' in dismantledItem) {
      const dismantledmaterial = {
        material: parseId(dismantledItem.material.id),
        actualDismantledQty: parseQty(dismantledItem.actualDismantledQty),
        recipeBomId:
          'recipeBomId' in dismantledItem && dismantledItem.recipeBomId
            ? parseId(dismantledItem.recipeBomId)
            : undefined,
        reusable: 'reusable' in dismantledItem ? parseReusable(dismantledItem.reusable) : Reusable.NO,
        materialStatus:
          'materialStatus' in dismantledItem
            ? parseMaterialStatus(dismantledItem.materialStatus)
            : MaterialStatus.SCRAPPED,
        rwDismantledMaterialId:
          'rwDismantledMaterialId' in dismantledItem ? parseId(dismantledItem.rwDismantledMaterialId) : undefined,
      };
      // Renmove undefined recipe BOM ID for extera Material
      dismantledmaterial.recipeBomId =
        dismantledmaterial.recipeBomId === 0 ? undefined : dismantledmaterial.recipeBomId;

      dismantledMaterials.push(dismantledmaterial);
    } else {
      throw new Error('Incorrect or missing Data!');
    }
  }
  return dismantledMaterials;
};

const parseReworkActions = (reworkActions: unknown): number[] => {
  if (!reworkActions || !Array.isArray(reworkActions)) {
    throw new Error('Incorrect or missing Data!');
  }
  const reworkActionsArray: number[] = [];
  for (const reworkAction of reworkActions) {
    reworkActionsArray.push(parseId(reworkAction));
  }

  return reworkActionsArray;
};

const parseAffectedRecipe = (affectedRecipe: unknown): number[] => {
  if (!affectedRecipe || !Array.isArray(affectedRecipe)) {
    throw new Error('Incorrect or missing Data!');
  }
  const affectedRecipeArray: number[] = [];
  for (const recipe of affectedRecipe) {
    affectedRecipeArray.push(parseId(recipe));
  }

  return affectedRecipeArray;
};

const nokDataProcessor = (nokData: unknown): NewNokData => {
  if (!nokData || typeof nokData !== 'object') {
    throw new Error('Incorrect or missing Data **!');
  }
  if (
    'productId' in nokData &&
    'productSN' in nokData &&
    'detectStationId' in nokData &&
    'detectShiftId' in nokData &&
    'initNokCodeId' in nokData &&
    'detectedTime' in nokData &&
    'nokStatus' in nokData &&
    'productStatus' in nokData &&
    'removeReport' in nokData
  ) {
    const nokDataToReturn: NewNokData = {
      productId: parseId(nokData.productId),
      productSN: parseProductSN(nokData.productSN),
      detectStationId: parseId(nokData.detectStationId),
      detectShiftId: parseId(nokData.detectShiftId),
      initNokCodeId: parseId(nokData.initNokCodeId),
      detectTime: parseDate(nokData.detectedTime),
      nokStatus: parseNokStatus(nokData.nokStatus),
      productStatus: parseProductStatus(nokData.productStatus),
      removeReport: parseBoolean(nokData.removeReport),
      description: 'description' in nokData ? parseDescription(nokData.description) : '',
    };
    return nokDataToReturn;
  } else {
    throw new Error('Incorrect or missing data --+-+!');
  }
};

const reworkDataProcessor = (reworkData: unknown): NokReworkData => {
  if (!reworkData || typeof reworkData !== 'object') {
    throw new Error('Incorrect or missing Data **!');
  }
  if ('nokId' in reworkData && 'reworkShift' in reworkData && 'reworkOperator' in reworkData) {
    const reworkDataToReturn: NokReworkData = {
      nokId: parseId(reworkData.nokId),
      reworkOperator: parseDescription(reworkData.reworkOperator),
      //reworkOperator: parseId(reworkData.reworkOperator)
      reworkShiftId: parseId(reworkData.reworkShift),
      id: 'id' in reworkData ? parseId(reworkData.id) : undefined,
      reworkStationId: 'reworkStation' in reworkData ? parseId(reworkData.reworkStation) : undefined,
      reworkActionsId: 'reworkActionsId' in reworkData ? parseReworkActions(reworkData.reworkActionsId) : [],
      reworkTime: 'reworkTime' in reworkData ? parseDate(reworkData.reworkTime) : new Date(),
      reworkDuration: 'reworkDuration' in reworkData ? parseQty(Number(reworkData.reworkDuration)) : 0,
      reworkManPower: 'reworkManPower' in reworkData ? parseQty(Number(reworkData.reworkManPower)) : 0,
      affectedRecipes: 'affectedRecipes' in reworkData ? parseAffectedRecipe(reworkData.affectedRecipes) : [],
      dismantledMaterials:
        'nokDismantleMaterials' in reworkData ? parseNokDismantledMaterial(reworkData.nokDismantleMaterials) : [],
      reworkNote: 'reworkNote' in reworkData ? parseDescription(reworkData.reworkNote) : '',
      reworkStatus: 'reworkStatus' in reworkData ? parseReworkStatus(reworkData.reworkStatus) : ReworkStatus.PENDING,
    };
    return reworkDataToReturn;
  } else {
    throw new Error('Incorrect or missing data --+-+!');
  }
};

export { nokDataProcessor, reworkDataProcessor, parseMaterialStatus };
