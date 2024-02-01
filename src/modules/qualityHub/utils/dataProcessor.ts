import { MaterialData, Product, ProductData, ProductGrpData, StationData, WorkShiftData } from '../types';
import { isString, isBoolean, stringLengthCheck } from '../../../utils/dataValidator';

const parseProductName = (productName: unknown): string => {
  if (!isString(productName) || !stringLengthCheck(productName,3, 'productName')) {
    throw new Error('Incorrect product name!');
  }
  return productName;
};

const parseProductCode = (productCode: unknown): string => {
  if (!isString(productCode) || !stringLengthCheck(productCode,3, 'productCode')) {
    throw new Error('Incorrect product code!');
  }
  return productCode;
};

const parseShiftName = (shiftName: unknown): string => {
  if (!isString(shiftName)) {
    throw new Error('Incorrect shift name!');
  }
  return shiftName;
}

const parseShiftCode = (shiftCode: unknown): string => {
  if (!isString(shiftCode)) {
    throw new Error('Incorrect shift code!');
  }
  return shiftCode;
}

const parseStationName = (stationName: unknown): string => {
  if (!isString(stationName)) {
    throw new Error('Incorrect station name!');
  }
  return stationName;
}

const parseStationCode = (stationCode: unknown): string => {
  if (!isString(stationCode)) {
    throw new Error('Incorrect station code!');
  }
  return stationCode;
}

const parseMaterialName = (materialName: unknown): string => {
  if (!isString(materialName)) {
    throw new Error('Incorrect material name!');
  }
  return materialName;
}

const parseMaterialCode = (materialCode: unknown): string => {
  if (!isString(materialCode)) {
    throw new Error('Incorrect material code!');
  }
  return materialCode;
}

const parseActive = (active: unknown): boolean => {
  if (!isBoolean(active)) {
    throw new Error('Incorrect or missing data!');
  }
  return active;
};

const productProcessor = async(productData: unknown): Promise<ProductData> => {
  if (!productData || typeof productData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  console.log('*** product data processor * productData ->', productData);
  
  if ('productName' in productData && 'productCode' in productData && 'productGrpId' in productData) {
    const newProduct: ProductData = {
      productName: parseProductName(productData.productName),
      productCode: parseProductCode(productData.productCode),
      active: 'active' in productData ? parseActive(productData.active) : true,
      productGrpId: 1,
  };
    return newProduct;
  } else {
    throw new Error('Data is missing');
  }
};

const productGrpProcessor = async(productGrpData: unknown): Promise<ProductGrpData> => {
  if (!productGrpData || typeof productGrpData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('groupName' in productGrpData && 'groupCode' in productGrpData) {
    const newProductGrp: ProductGrpData = {
      groupName: parseProductName(productGrpData.groupName),
      groupCode: parseProductCode(productGrpData.groupCode),
      active: 'active' in productGrpData ? parseActive(productGrpData.active) : true,
  };
    return newProductGrp;
  } else {
    throw new Error('Data is missing');
  }
};
 
const parseProductResponse = (productData: Product): Product => {
  return ({
    id: productData.id,
    productName: productData.productName,
    productCode: productData.productCode,
    group: productData.group,
    active: productData.active,
  });
};

// work shift Processor
const workShiftProcessor = async(workShiftData: unknown): Promise<WorkShiftData> => {
  if (!workShiftData || typeof workShiftData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('shiftName' in workShiftData && 'shiftCode' in workShiftData) {
    const newWorkShift: WorkShiftData = {
      shiftName: parseShiftName(workShiftData.shiftName),
      shiftCode: parseShiftCode(workShiftData.shiftCode),
      active: 'active' in workShiftData ? parseActive(workShiftData.active) : true,
  };
    return newWorkShift;
  } else {
    throw new Error('Data is missing');
  }
}

// Station Processor
const stationProcessor = async(stationData: unknown): Promise<StationData> => {
  
  if (!stationData || typeof stationData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('stationName' in stationData && 'stationCode' in stationData) {
    const newStation: StationData = {
      stationName: parseStationName(stationData.stationName),
      stationCode: parseStationCode(stationData.stationCode),
      active: 'active' in stationData ? parseActive(stationData.active) : true,
  };
    return newStation;
  } else {
    throw new Error('Data is missing');
  }
}

// Station Processor
const materialProcessor = async(materialData: unknown): Promise<MaterialData> => {
  
  if (!materialData || typeof materialData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('itemShortName' in materialData && 'itemLongName' in materialData && 'itemCode' in materialData) {
    const newMaterial: MaterialData = {
      itemShortName: parseMaterialName(materialData.itemShortName),
      itemLongName: parseMaterialName(materialData.itemLongName),
      itemCode: parseMaterialCode(materialData.itemCode),
      active: 'active' in materialData ? parseActive(materialData.active) : true,
  };
    return newMaterial;
  } else {
    throw new Error('Data is missing');
  }
}

export {
  productProcessor,
  parseProductResponse,
  productGrpProcessor,
  workShiftProcessor,
  stationProcessor,
  materialProcessor
};