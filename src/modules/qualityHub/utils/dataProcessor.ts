import {
  ClaimStatus,
  ClassCodeData,
  ConsumingMaterial,
  MachineData,
  MaterialData,
  NewClaimData,
  NokCodeData,
  NokGrpData,
  Product,
  ProductData,
  ProductGrpData,
  RcaCodeData,
  RecipeData,
  RecipeType,
  Reusable,
  StationData,
  WorkShiftData,
} from '../types';
import { isString, isBoolean, stringLengthCheck, isNumber } from '../../../utils/dataValidator';

const parseProductName = (productName: unknown): string => {
  if (!isString(productName) || !stringLengthCheck(productName, 3, 'productName')) {
    throw new Error('Incorrect product name!');
  }
  return productName;
};

const parseProductCode = (productCode: unknown): string => {
  if (!isString(productCode) || !stringLengthCheck(productCode, 3, 'productCode')) {
    throw new Error('Incorrect product code!');
  }
  return productCode;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect shift name!');
  }
  return name;
};

const parseCode = (code: unknown): string => {
  if (!isString(code)) {
    throw new Error('Incorrect shift code!');
  }
  return code;
};

const parseShiftName = (shiftName: unknown): string => {
  if (!isString(shiftName)) {
    throw new Error('Incorrect shift name!');
  }
  return shiftName;
};

const parseShiftCode = (shiftCode: unknown): string => {
  if (!isString(shiftCode)) {
    throw new Error('Incorrect shift code!');
  }
  return shiftCode;
};

const parseStationName = (stationName: unknown): string => {
  if (!isString(stationName)) {
    throw new Error('Incorrect station name!');
  }
  return stationName;
};

const parseStationCode = (stationCode: unknown): string => {
  if (!isString(stationCode)) {
    throw new Error('Incorrect station code!');
  }
  return stationCode;
};

const parseMaterialName = (materialName: unknown): string => {
  if (!isString(materialName)) {
    throw new Error('Incorrect material name!');
  }
  return materialName;
};

const parseMaterialCode = (materialCode: unknown): string => {
  if (!isString(materialCode)) {
    throw new Error('Incorrect material code!');
  }
  return materialCode;
};

const parseRecipeCode = (recipeCode: unknown): string => {
  if (!isString(recipeCode)) {
    throw new Error('Incorrect Recipe code!');
  }
  return recipeCode;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect material name!');
  }
  return description;
};

const parseOrder = (order: unknown): number => {
  if (!isNumber(order)) {
    throw new Error('Incorrect material name!');
  }
  return order;
};

const parseRecipeProduct = (productId: unknown): number => {
  if (!isNumber(productId)) {
    throw new Error('Incorrect material name!');
  }
  return productId;
};
const parseRecipeStation = (stationId: unknown): number => {
  if (!isNumber(stationId)) {
    throw new Error('Incorrect material name!');
  }
  return stationId;
};

const parseId = (id: unknown): number => {
  if (!isNumber(id)) {
    throw new Error('Incorrect or ID data!');
  }
  return id;
};

const parseQty = (qty: unknown): number => {
  if (!isNumber(qty)) {
    throw new Error('Incorrect or Number type!');
  }
  return qty;
};

const parseActive = (active: unknown): boolean => {
  if (!isBoolean(active)) {
    throw new Error('Incorrect or Active data!');
  }
  return active;
};

const parseReusable = (reusable: unknown): Reusable => {
  if (!isString(reusable)) {
    throw new Error('Incorrect or Reusable data!');
  }
  switch (reusable) {
    case 'YES':
      return Reusable.YES;
    case 'NO':
      return Reusable.NO;
    case 'IQC':
      return Reusable.IQC;
    default:
      throw new Error('Incorrect or Reusable data!');
  }
};

const parseRecipeType = (recipeType: unknown): RecipeType => {
  if (!isString(recipeType)) {
    throw new Error('Incorrect or Recipe type!');
  }
  switch (recipeType) {
    case 'PRODUCTION':
      return RecipeType.PRODUCTION;
    case 'REWORK':
      return RecipeType.REWORK;
    default:
      throw new Error('Incorrect or Recipe type!');
  }
};

const productProcessor = (productData: unknown): ProductData => {
  if (!productData || typeof productData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }

  if ('productName' in productData && 'productCode' in productData && 'productGrpId' in productData) {
    const newProduct: ProductData = {
      productName: parseProductName(productData.productName),
      productCode: parseProductCode(productData.productCode),
      active: 'active' in productData ? parseActive(productData.active) : true,
      productGrpId: parseId(productData.productGrpId),
    };
    return newProduct;
  } else {
    throw new Error('Data is missing');
  }
};

const productGrpProcessor = (productGrpData: unknown): ProductGrpData => {
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
  return {
    id: productData.id,
    productName: productData.productName,
    productCode: productData.productCode,
    group: productData.group,
    active: productData.active,
  };
};

// work shift Processor
const workShiftProcessor = (workShiftData: unknown): WorkShiftData => {
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
};

// Station Processor
const stationProcessor = (stationData: unknown): StationData => {
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
};

// Station Processor
const materialProcessor = (materialData: unknown): MaterialData => {
  if (!materialData || typeof materialData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if (
    'itemShortName' in materialData &&
    'itemLongName' in materialData &&
    'itemCode' in materialData &&
    'traceable' in materialData
  ) {
    const newMaterial: MaterialData = {
      itemShortName: parseMaterialName(materialData.itemShortName),
      itemLongName: parseMaterialName(materialData.itemLongName),
      itemCode: parseMaterialCode(materialData.itemCode),
      active: 'active' in materialData ? parseActive(materialData.active) : true,
      price: 'price' in materialData ? parseQty(Number(materialData.price)) : 0,
      unit: 'unit' in materialData ? parseMaterialName(materialData.unit) : '',
      traceable: 'traceable' in materialData ? parseActive(materialData.traceable) : false,
    };

    return newMaterial;
  } else {
    throw new Error('Data is missing');
  }
};

const recipeProcessor = (recipeData: unknown): RecipeData => {
  if (!recipeData || typeof recipeData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }

  if (
    'recipeCode' in recipeData &&
    'description' in recipeData &&
    'order' in recipeData &&
    'productId' in recipeData &&
    'stationId' in recipeData &&
    'recipeType' in recipeData
  ) {
    const newRecipe: RecipeData = {
      recipeCode: parseRecipeCode(recipeData.recipeCode),
      description: parseDescription(recipeData.description),
      order: parseOrder(Number(recipeData.order)),
      productId: parseRecipeProduct(recipeData.productId),
      stationId: parseRecipeStation(recipeData.stationId),
      recipeType: parseRecipeType(recipeData.recipeType),
      timeDuration: 'timeDuration' in recipeData ? parseQty(recipeData.timeDuration) : 0,
      active: 'active' in recipeData ? parseActive(recipeData.active) : true,
      materialsData: 'materialsData' in recipeData ? parseMaterialsData(recipeData.materialsData) : [],
      manpower: 'manpower' in recipeData ? parseQty(recipeData.manpower) : 0,
    };

    return newRecipe;
  } else {
    throw new Error('Data is missing');
  }
};

const parseMaterialsData = (bomData: unknown): ConsumingMaterial[] => {
  if (!bomData || !Array.isArray(bomData)) {
    throw new Error('Incorrect or missing Data!');
  }

  const newBoms: ConsumingMaterial[] = [];
  for (const bom of bomData) {
    if ('materialId' in bom && 'qty' in bom) {
      const newConsumingMaterial: ConsumingMaterial = {
        materialId: parseId(bom.materialId),
        qty: parseQty(bom.qty),
        reusable: 'reusable' in bom ? parseReusable(bom.reusable) : Reusable.NO,
      };
      newBoms.push(newConsumingMaterial);
    }
  }

  return newBoms;
};

const nokGrpProcessor = (nokGrpData: unknown): NokGrpData => {
  if (!nokGrpData || typeof nokGrpData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('nokGrpName' in nokGrpData && 'nokGrpCode' in nokGrpData) {
    const newProductGrp: NokGrpData = {
      nokGrpName: parseName(nokGrpData.nokGrpName),
      nokGrpCode: parseCode(nokGrpData.nokGrpCode),
      nokGrpDesc: 'nokGrpDesc' in nokGrpData ? parseDescription(nokGrpData.nokGrpDesc) : '',
      active: 'active' in nokGrpData ? parseActive(nokGrpData.active) : true,
    };
    return newProductGrp;
  } else {
    throw new Error('Data is missing');
  }
};

const nokCodeProcessor = (nokCodeData: unknown): NokCodeData => {
  if (!nokCodeData || typeof nokCodeData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('nokCode' in nokCodeData && 'nokDesc' in nokCodeData && 'nokGrpId' in nokCodeData) {
    const newNokCode: NokCodeData = {
      nokCode: parseCode(nokCodeData.nokCode),
      nokDesc: parseDescription(nokCodeData.nokDesc),
      nokGrpId: parseId(nokCodeData.nokGrpId),
      active: 'active' in nokCodeData ? parseActive(nokCodeData.active) : true,
    };
    return newNokCode;
  } else {
    throw new Error('Data is missing');
  }
};

const rcaCodeProcessor = (rcaCodeData: unknown): RcaCodeData => {
  if (!rcaCodeData || typeof rcaCodeData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('rcaCode' in rcaCodeData && 'rcaDesc' in rcaCodeData) {
    const newRcaCode: RcaCodeData = {
      rcaCode: parseCode(rcaCodeData.rcaCode),
      rcaDesc: parseDescription(rcaCodeData.rcaDesc),
      active: 'active' in rcaCodeData ? parseActive(rcaCodeData.active) : true,
    };
    return newRcaCode;
  } else {
    throw new Error('Data is missing');
  }
};

const parseClaimStatus = (claimStatusData: unknown): ClaimStatus => {
  if (!isString(claimStatusData)) {
    throw new Error('Incorrect or missing Data!');
  }
  switch (claimStatusData) {
    case 'PENDING':
      return ClaimStatus.PENDING;
    case 'ACCEPTED':
      return ClaimStatus.ACCEPTED;
    case 'DENIED':
      return ClaimStatus.DENIED;
    default:
      throw new Error('Incorrect or missing Data!');
  }
};

const machineProcessor = (machineData: unknown): MachineData => {
  if (!machineData || typeof machineData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('machineName' in machineData && 'machineCode' in machineData) {
    const newMachine: MachineData = {
      machineName: parseName(machineData.machineName),
      machineCode: parseCode(machineData.machineCode),
      description: 'description' in machineData ? parseDescription(machineData.description) : '',
      stationId: 'stationId' in machineData ? parseId(machineData.stationId) : 0,
      active: 'active' in machineData ? parseActive(machineData.active) : true,
    };
    return newMachine;
  } else {
    throw new Error('Data is missing');
  }
};

const classCodeProcessor = (classCodeData: unknown): ClassCodeData => {
  if (!classCodeData || typeof classCodeData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('className' in classCodeData && 'classCode' in classCodeData && 'classDesc' in classCodeData) {
    const newClassCode: ClassCodeData = {
      className: parseName(classCodeData.className),
      classCode: parseCode(classCodeData.classCode),
      classDesc: parseDescription(classCodeData.classDesc),
      active: 'active' in classCodeData ? parseActive(classCodeData.active) : true,
    };
    return newClassCode;
  } else {
    throw new Error('Data is missing');
  }
};

// Claim Status Processor
const claimStatusProcessor = (claimData: unknown): NewClaimData => {
  if (!claimData || typeof claimData !== 'object') {
    throw new Error('Incorrect or missing Data!');
  }
  if ('claimStatus' in claimData && 'dismantledMaterialId' in claimData) {
    const newClaim: NewClaimData = {
      dismantledMaterialId: parseId(claimData.dismantledMaterialId),
      claimStatus: parseClaimStatus(claimData.claimStatus),
      date: new Date(),
      referenceType: 'referenceType' in claimData ? parseName(claimData.referenceType) : '',
      reference: 'reference' in claimData ? parseName(claimData.reference) : '',
      description: 'description' in claimData ? parseDescription(claimData.description) : '',
    };
    return newClaim;
  } else {
    throw new Error('Data is missing');
  }
};

export {
  parseDescription,
  parseOrder,
  parseQty,
  parseActive,
  productProcessor,
  parseProductResponse,
  productGrpProcessor,
  workShiftProcessor,
  stationProcessor,
  materialProcessor,
  recipeProcessor,
  nokGrpProcessor,
  nokCodeProcessor,
  rcaCodeProcessor,
  machineProcessor,
  classCodeProcessor,
  claimStatusProcessor,
};
