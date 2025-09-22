"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimStatusProcessor = exports.classCodeProcessor = exports.machineProcessor = exports.rcaCodeProcessor = exports.nokCodeProcessor = exports.nokGrpProcessor = exports.recipeProcessor = exports.materialProcessor = exports.stationProcessor = exports.workShiftProcessor = exports.productGrpProcessor = exports.parseProductResponse = exports.productProcessor = exports.parseActive = exports.parseQty = exports.parseOrder = exports.parseDescription = void 0;
const types_1 = require("../types");
const dataValidator_1 = require("../../../utils/dataValidator");
const parseProductName = (productName) => {
    if (!(0, dataValidator_1.isString)(productName) || !(0, dataValidator_1.stringLengthCheck)(productName, 3, 'productName')) {
        throw new Error('Incorrect product name!');
    }
    return productName;
};
const parseProductCode = (productCode) => {
    if (!(0, dataValidator_1.isString)(productCode) || !(0, dataValidator_1.stringLengthCheck)(productCode, 3, 'productCode')) {
        throw new Error('Incorrect product code!');
    }
    return productCode;
};
const parseName = (name) => {
    if (!(0, dataValidator_1.isString)(name)) {
        throw new Error('Incorrect shift name!');
    }
    return name;
};
const parseCode = (code) => {
    if (!(0, dataValidator_1.isString)(code)) {
        throw new Error('Incorrect shift code!');
    }
    return code;
};
const parseShiftName = (shiftName) => {
    if (!(0, dataValidator_1.isString)(shiftName)) {
        throw new Error('Incorrect shift name!');
    }
    return shiftName;
};
const parseShiftCode = (shiftCode) => {
    if (!(0, dataValidator_1.isString)(shiftCode)) {
        throw new Error('Incorrect shift code!');
    }
    return shiftCode;
};
const parseStationName = (stationName) => {
    if (!(0, dataValidator_1.isString)(stationName)) {
        throw new Error('Incorrect station name!');
    }
    return stationName;
};
const parseStationCode = (stationCode) => {
    if (!(0, dataValidator_1.isString)(stationCode)) {
        throw new Error('Incorrect station code!');
    }
    return stationCode;
};
const parseMaterialName = (materialName) => {
    if (!(0, dataValidator_1.isString)(materialName)) {
        throw new Error('Incorrect material name!');
    }
    return materialName;
};
const parseMaterialCode = (materialCode) => {
    if (!(0, dataValidator_1.isString)(materialCode)) {
        throw new Error('Incorrect material code!');
    }
    return materialCode;
};
const parseRecipeCode = (recipeCode) => {
    if (!(0, dataValidator_1.isString)(recipeCode)) {
        throw new Error('Incorrect Recipe code!');
    }
    return recipeCode;
};
const parseDescription = (description) => {
    if (!(0, dataValidator_1.isString)(description)) {
        throw new Error('Incorrect material name!');
    }
    return description;
};
exports.parseDescription = parseDescription;
const parseOrder = (order) => {
    if (!(0, dataValidator_1.isNumber)(order)) {
        throw new Error('Incorrect material name!');
    }
    return order;
};
exports.parseOrder = parseOrder;
const parseRecipeProduct = (productId) => {
    if (!(0, dataValidator_1.isNumber)(productId)) {
        throw new Error('Incorrect material name!');
    }
    return productId;
};
const parseRecipeStation = (stationId) => {
    if (!(0, dataValidator_1.isNumber)(stationId)) {
        throw new Error('Incorrect material name!');
    }
    return stationId;
};
const parseId = (id) => {
    if (!(0, dataValidator_1.isNumber)(id)) {
        throw new Error('Incorrect or ID data!');
    }
    return id;
};
const parseQty = (qty) => {
    if (!(0, dataValidator_1.isNumber)(qty)) {
        throw new Error('Incorrect or Number type!');
    }
    return qty;
};
exports.parseQty = parseQty;
const parseActive = (active) => {
    if (!(0, dataValidator_1.isBoolean)(active)) {
        throw new Error('Incorrect or Active data!');
    }
    return active;
};
exports.parseActive = parseActive;
const parseReusable = (reusable) => {
    if (!(0, dataValidator_1.isString)(reusable)) {
        throw new Error('Incorrect or Reusable data!');
    }
    switch (reusable) {
        case 'YES':
            return types_1.Reusable.YES;
        case 'NO':
            return types_1.Reusable.NO;
        case 'IQC':
            return types_1.Reusable.IQC;
        default:
            throw new Error('Incorrect or Reusable data!');
    }
};
const parseRecipeType = (recipeType) => {
    if (!(0, dataValidator_1.isString)(recipeType)) {
        throw new Error('Incorrect or Recipe type!');
    }
    switch (recipeType) {
        case 'PRODUCTION':
            return types_1.RecipeType.PRODUCTION;
        case 'REWORK':
            return types_1.RecipeType.REWORK;
        default:
            throw new Error('Incorrect or Recipe type!');
    }
};
const productProcessor = (productData) => {
    if (!productData || typeof productData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('productName' in productData && 'productCode' in productData && 'productGrpId' in productData) {
        const newProduct = {
            productName: parseProductName(productData.productName),
            productCode: parseProductCode(productData.productCode),
            active: 'active' in productData ? parseActive(productData.active) : true,
            productGrpId: parseId(productData.productGrpId),
        };
        return newProduct;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.productProcessor = productProcessor;
const productGrpProcessor = (productGrpData) => {
    if (!productGrpData || typeof productGrpData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('groupName' in productGrpData && 'groupCode' in productGrpData) {
        const newProductGrp = {
            groupName: parseProductName(productGrpData.groupName),
            groupCode: parseProductCode(productGrpData.groupCode),
            active: 'active' in productGrpData ? parseActive(productGrpData.active) : true,
        };
        return newProductGrp;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.productGrpProcessor = productGrpProcessor;
const parseProductResponse = (productData) => {
    return {
        id: productData.id,
        productName: productData.productName,
        productCode: productData.productCode,
        group: productData.group,
        active: productData.active,
    };
};
exports.parseProductResponse = parseProductResponse;
// work shift Processor
const workShiftProcessor = (workShiftData) => {
    if (!workShiftData || typeof workShiftData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('shiftName' in workShiftData && 'shiftCode' in workShiftData) {
        const newWorkShift = {
            shiftName: parseShiftName(workShiftData.shiftName),
            shiftCode: parseShiftCode(workShiftData.shiftCode),
            active: 'active' in workShiftData ? parseActive(workShiftData.active) : true,
        };
        return newWorkShift;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.workShiftProcessor = workShiftProcessor;
// Station Processor
const stationProcessor = (stationData) => {
    if (!stationData || typeof stationData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('stationName' in stationData && 'stationCode' in stationData) {
        const newStation = {
            stationName: parseStationName(stationData.stationName),
            stationCode: parseStationCode(stationData.stationCode),
            active: 'active' in stationData ? parseActive(stationData.active) : true,
        };
        return newStation;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.stationProcessor = stationProcessor;
// Station Processor
const materialProcessor = (materialData) => {
    if (!materialData || typeof materialData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('itemShortName' in materialData &&
        'itemLongName' in materialData &&
        'itemCode' in materialData &&
        'traceable' in materialData) {
        const newMaterial = {
            itemShortName: parseMaterialName(materialData.itemShortName),
            itemLongName: parseMaterialName(materialData.itemLongName),
            itemCode: parseMaterialCode(materialData.itemCode),
            active: 'active' in materialData ? parseActive(materialData.active) : true,
            price: 'price' in materialData ? parseQty(Number(materialData.price)) : 0,
            unit: 'unit' in materialData ? parseMaterialName(materialData.unit) : '',
            traceable: 'traceable' in materialData ? parseActive(materialData.traceable) : false,
        };
        return newMaterial;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.materialProcessor = materialProcessor;
const recipeProcessor = (recipeData) => {
    if (!recipeData || typeof recipeData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('recipeCode' in recipeData &&
        'description' in recipeData &&
        'order' in recipeData &&
        'productId' in recipeData &&
        'stationId' in recipeData &&
        'recipeType' in recipeData) {
        const newRecipe = {
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
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.recipeProcessor = recipeProcessor;
const parseMaterialsData = (bomData) => {
    if (!bomData || !Array.isArray(bomData)) {
        throw new Error('Incorrect or missing Data!');
    }
    const newBoms = [];
    for (const bom of bomData) {
        if ('materialId' in bom && 'qty' in bom) {
            const newConsumingMaterial = {
                materialId: parseId(bom.materialId),
                qty: parseQty(bom.qty),
                reusable: 'reusable' in bom ? parseReusable(bom.reusable) : types_1.Reusable.NO,
            };
            newBoms.push(newConsumingMaterial);
        }
    }
    return newBoms;
};
const nokGrpProcessor = (nokGrpData) => {
    if (!nokGrpData || typeof nokGrpData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('nokGrpName' in nokGrpData && 'nokGrpCode' in nokGrpData) {
        const newProductGrp = {
            nokGrpName: parseName(nokGrpData.nokGrpName),
            nokGrpCode: parseCode(nokGrpData.nokGrpCode),
            nokGrpDesc: 'nokGrpDesc' in nokGrpData ? parseDescription(nokGrpData.nokGrpDesc) : '',
            active: 'active' in nokGrpData ? parseActive(nokGrpData.active) : true,
        };
        return newProductGrp;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.nokGrpProcessor = nokGrpProcessor;
const nokCodeProcessor = (nokCodeData) => {
    if (!nokCodeData || typeof nokCodeData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('nokCode' in nokCodeData && 'nokDesc' in nokCodeData && 'nokGrpId' in nokCodeData) {
        const newNokCode = {
            nokCode: parseCode(nokCodeData.nokCode),
            nokDesc: parseDescription(nokCodeData.nokDesc),
            nokGrpId: parseId(nokCodeData.nokGrpId),
            active: 'active' in nokCodeData ? parseActive(nokCodeData.active) : true,
        };
        return newNokCode;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.nokCodeProcessor = nokCodeProcessor;
const rcaCodeProcessor = (rcaCodeData) => {
    if (!rcaCodeData || typeof rcaCodeData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('rcaCode' in rcaCodeData && 'rcaDesc' in rcaCodeData) {
        const newRcaCode = {
            rcaCode: parseCode(rcaCodeData.rcaCode),
            rcaDesc: parseDescription(rcaCodeData.rcaDesc),
            active: 'active' in rcaCodeData ? parseActive(rcaCodeData.active) : true,
        };
        return newRcaCode;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.rcaCodeProcessor = rcaCodeProcessor;
const parseClaimStatus = (claimStatusData) => {
    if (!(0, dataValidator_1.isString)(claimStatusData)) {
        throw new Error('Incorrect or missing Data!');
    }
    switch (claimStatusData) {
        case 'PENDING':
            return types_1.ClaimStatus.PENDING;
        case 'ACCEPTED':
            return types_1.ClaimStatus.ACCEPTED;
        case 'DENIED':
            return types_1.ClaimStatus.DENIED;
        default:
            throw new Error('Incorrect or missing Data!');
    }
};
const machineProcessor = (machineData) => {
    if (!machineData || typeof machineData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('machineName' in machineData && 'machineCode' in machineData) {
        const newMachine = {
            machineName: parseName(machineData.machineName),
            machineCode: parseCode(machineData.machineCode),
            description: 'description' in machineData ? parseDescription(machineData.description) : '',
            stationId: 'stationId' in machineData ? parseId(machineData.stationId) : 0,
            active: 'active' in machineData ? parseActive(machineData.active) : true,
        };
        return newMachine;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.machineProcessor = machineProcessor;
const classCodeProcessor = (classCodeData) => {
    if (!classCodeData || typeof classCodeData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('className' in classCodeData && 'classCode' in classCodeData && 'classDesc' in classCodeData) {
        const newClassCode = {
            className: parseName(classCodeData.className),
            classCode: parseCode(classCodeData.classCode),
            classDesc: parseDescription(classCodeData.classDesc),
            active: 'active' in classCodeData ? parseActive(classCodeData.active) : true,
        };
        return newClassCode;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.classCodeProcessor = classCodeProcessor;
// Claim Status Processor
const claimStatusProcessor = (claimData) => {
    if (!claimData || typeof claimData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('claimStatus' in claimData && 'dismantledMaterialId' in claimData) {
        const newClaim = {
            dismantledMaterialId: parseId(claimData.dismantledMaterialId),
            claimStatus: parseClaimStatus(claimData.claimStatus),
            date: new Date(),
            referenceType: 'referenceType' in claimData ? parseName(claimData.referenceType) : '',
            reference: 'reference' in claimData ? parseName(claimData.reference) : '',
            description: 'description' in claimData ? parseDescription(claimData.description) : '',
        };
        return newClaim;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.claimStatusProcessor = claimStatusProcessor;
