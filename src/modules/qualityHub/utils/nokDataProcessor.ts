import { isString, parseId, parseDate, parseBoolean } from '../../../utils/dataValidator';
import { DismantledMaterialData, MaterialStatus, NewNokData, NokReworkData, NokStatus, ProductStatus, ReworkStatus } from '../types';
import { parseDescription, parseQty } from './dataProcessor';


const parseProductSN = (productSN: unknown) : string => {
  if (!productSN || !isString(productSN)) {
    throw new Error('Incorrect or missing productSN!');
  }
  return productSN;
}

const parseNokStatus = (nokStatus: unknown) : NokStatus => {
  if (!isString(nokStatus)) {
    throw new Error('Incorrect or missing data!');
  }
  switch(nokStatus) {
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
}

const parseProductStatus = (productStatus: unknown) : ProductStatus => {
  if (!isString(productStatus)) {
    throw new Error('Incorrect or missing data!');
  }
  switch(productStatus) {
    case 'NOK':
      return ProductStatus.NOK;
    case 'REWORKED':
      return ProductStatus.REWORKED;
    case 'SCRAPPED':
      return ProductStatus.SCRAPPED;
    default:
      throw new Error('Incorrect or missing data! ---');
  }
}

const parseReworkStatus = (reworkStatus: unknown) : ReworkStatus => {
  if (!isString(reworkStatus)) {
    throw new Error('Incorrect or missing data!');
  }
  switch(reworkStatus) {
    case 'PENDING':
      return ReworkStatus.PENDING;
    case 'POSTPONED':
      return ReworkStatus.POSTPONED;
    case 'COMPLETED':
      return ReworkStatus.COMPLETED;
    case 'CANCELLED':
      return ReworkStatus.CANCELLED;
    default:
      throw new Error('Incorrect or missing data ---');
  }
}

const parseMaterialStatus = (materialStatus: unknown) : MaterialStatus => {
  if (!isString(materialStatus)) {
    throw new Error('Incorrect or missing data!');
  }
  switch(materialStatus) {
    case 'SCRAPPED':
      return MaterialStatus.SCRAPPED;
    case 'OK':
      return MaterialStatus.OK;
    case 'CLAIMABLE':
      return MaterialStatus.CLAIMABLE;
    default:
      throw new Error('Incorrect or missing data ---');
  }
}

const parseNokDismantledMaterial = (dismantledMaterialData: unknown) : DismantledMaterialData[] => {

  if (!dismantledMaterialData || !Array.isArray(dismantledMaterialData)) {
    console.log('++ Data processing Error 2');
    throw new Error('Incorrect or missing Data **!');
  }
  const dismantledMaterials : DismantledMaterialData[] = [];
  for (const dismantledItem of dismantledMaterialData) {
    if (!dismantledItem || typeof dismantledItem !== 'object') {
      console.log('++ Data processing Error 3');

      throw new Error('Incorrect or missing Data **!');
    }
    if ('material' in dismantledItem && 'dismantledQty' in dismantledItem ){
          console.log('+++ corect Dismantled Material Data');
          
      const dismantledmaterial = { 
        material: parseId(dismantledItem.material.id), 
        dismantledQty: parseQty(dismantledItem.dismantledQty),
        recipeBom: 'recipeBom' in dismantledItem ? parseId(dismantledItem.recipeBom.id) : 'EXTERNAL',
        status: 'status' in dismantledItem ? parseMaterialStatus(dismantledItem.status) : MaterialStatus.SCRAPPED,
      }
      dismantledMaterials.push(dismantledmaterial)
    } else {
      console.log('+++ Incorrect Dismantled Material Data');
    }
  }

  return dismantledMaterials;
}

const parseReworkActions =  (reworkActions: unknown) : number[] => {
  if (!reworkActions || !Array.isArray(reworkActions)) {
    console.log('++ Data processing Error 2');
    throw new Error('Incorrect or missing Data **!');
  }
  const reworkActionsArray : number[] = [];
  for (const reworkAction of reworkActions) {
    if (!reworkAction || typeof reworkAction !== 'object') {
      console.log('++ Data processing Error 3');

      throw new Error('Incorrect or missing Data **!');
    }
    if ('reworkAction' in reworkAction) {
      reworkActionsArray.push(parseId(reworkAction.reworkAction))
    }
  }

  return reworkActionsArray;
}



const nokDataProcessor = (nokData: unknown) : NewNokData => {
  if (!nokData || typeof nokData !== 'object') {
    throw new Error('Incorrect or missing Data **!');
  }
  if ( 'productId'  in nokData &&
    'productSN' in nokData &&
    'detectStationId' in nokData &&
    'detectShiftId' in nokData &&
    'initNokCodeId' in nokData &&
    'detectedTime' in nokData &&
    'nokStatus' in nokData &&
    'productStatus' in nokData &&
    'removeReport' in nokData ) {
      const nokDataToReturn : NewNokData = {
        productId: parseId(nokData.productId),
        productSN: parseProductSN(nokData.productSN),
        detectStationId: parseId(nokData.detectStationId),
        detectShiftId: parseId(nokData.detectShiftId),
        initNokCodeId: parseId(nokData.initNokCodeId),
        detectTime: parseDate(nokData.detectedTime),
        nokStatus: parseNokStatus(nokData.nokStatus),
        productStatus: parseProductStatus(nokData.productStatus),
        removeReport: parseBoolean(nokData.removeReport),
        description: 'description' in nokData ? parseDescription(nokData.description) : ''
      }
    return nokDataToReturn
  } else {
    throw new Error('Incorrect or missing data --+-+!');
  }
}

const reworkDataProcessor = (reworkData: unknown) : NokReworkData => {
  if (!reworkData || typeof reworkData !== 'object') {
    throw new Error('Incorrect or missing Data **!');
  }
  if ( 'nokId'  in reworkData &&
    'reworkShift' in reworkData &&
    'reworkOperator' in reworkData ) {
      const reworkDataToReturn : NokReworkData = {
        nokId: parseId(reworkData.nokId),
        reworkOperator: parseDescription(reworkData.reworkOperator),
        //reworkOperator: parseId(reworkData.reworkOperator)
        reworkShiftId: parseId(reworkData.reworkShift),
        reworkActionsId: 'reworkActions' in reworkData ? parseReworkActions(reworkData.reworkActions) : [],
        reworkTime: 'reworkTime' in reworkData ? parseDate(reworkData.reworkTime) : new Date(),
        dismantledMaterials: 'dismantledMaterials' in reworkData ? parseNokDismantledMaterial(reworkData.dismantledMaterials) : [],
        reworkStatus: 'reworkStatus' in reworkData ? parseReworkStatus(reworkData.reworkStatus) : ReworkStatus.PENDING
      }
    return reworkDataToReturn
  } else {
    throw new Error('Incorrect or missing data --+-+!');
  }
} 

export {
  nokDataProcessor,
  reworkDataProcessor
}