"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMaterialStatus = exports.reworkDataProcessor = exports.nokDataProcessor = void 0;
const dataValidator_1 = require("../../../utils/dataValidator");
const types_1 = require("../types");
const dataProcessor_1 = require("./dataProcessor");
const parseProductSN = (productSN) => {
    if (!productSN || !(0, dataValidator_1.isString)(productSN)) {
        throw new Error('Incorrect or missing productSN!');
    }
    return productSN;
};
const parseNokStatus = (nokStatus) => {
    if (!(0, dataValidator_1.isString)(nokStatus)) {
        throw new Error('Incorrect or missing data 10!');
    }
    switch (nokStatus) {
        case 'PENDING':
            return types_1.NokStatus.PENDING;
        case 'ANALYSED':
            return types_1.NokStatus.ANALYSED;
        case 'NEED INVESTIGATION':
            return types_1.NokStatus.NEED_INVESTIGATION;
        case 'NOT FOUND':
            return types_1.NokStatus.NOT_FOUND;
        default:
            throw new Error('Incorrect or missing data ++!');
    }
};
const parseProductStatus = (productStatus) => {
    if (!(0, dataValidator_1.isString)(productStatus)) {
        throw new Error('Incorrect or missing data 11!');
    }
    switch (productStatus) {
        case 'NOK':
            return types_1.ProductStatus.NOK;
        case 'REWORKED':
            return types_1.ProductStatus.REWORKED;
        case 'SCRAPPED':
            return types_1.ProductStatus.SCRAPPED;
        default:
            throw new Error('Incorrect or missing data! -11--');
    }
};
const parseReworkStatus = (reworkStatus) => {
    if (!(0, dataValidator_1.isString)(reworkStatus)) {
        throw new Error('Incorrect or missing data 12!');
    }
    switch (reworkStatus) {
        case 'PENDING':
            return types_1.ReworkStatus.PENDING;
        case 'IN_PROGRESS':
            return types_1.ReworkStatus.IN_PROGRESS;
        case 'POSTPONED':
            return types_1.ReworkStatus.POSTPONED;
        case 'COMPLETED':
            return types_1.ReworkStatus.COMPLETED;
        case 'CANCELLED':
            return types_1.ReworkStatus.CANCELLED;
        default:
            throw new Error('Incorrect or missing data');
    }
};
const parseMaterialStatus = (materialStatus) => {
    if (!(0, dataValidator_1.isString)(materialStatus)) {
        throw new Error('Incorrect or missing data!');
    }
    switch (materialStatus) {
        case 'SCRAPPED':
            return types_1.MaterialStatus.SCRAPPED;
        case 'OK':
            return types_1.MaterialStatus.OK;
        case 'IQC':
            return types_1.MaterialStatus.IQC;
        case 'CLAIMABLE':
            return types_1.MaterialStatus.CLAIMABLE;
        default:
            throw new Error('Incorrect or missing data -13--');
    }
};
exports.parseMaterialStatus = parseMaterialStatus;
const parseReusable = (reusable) => {
    if (!(0, dataValidator_1.isString)(reusable)) {
        throw new Error('Incorrect or missing data 14!');
    }
    switch (reusable) {
        case 'YES':
            return types_1.Reusable.YES;
        case 'NO':
            return types_1.Reusable.NO;
        case 'IQC':
            return types_1.Reusable.IQC;
        default:
            throw new Error('Incorrect or missing data -14--');
    }
};
const parseNokDismantledMaterial = (dismantledMaterialData) => {
    if (!dismantledMaterialData || !Array.isArray(dismantledMaterialData)) {
        throw new Error('Incorrect or missing Data!');
    }
    const dismantledMaterials = [];
    for (const dismantledItem of dismantledMaterialData) {
        if (!dismantledItem || typeof dismantledItem !== 'object') {
            throw new Error('Incorrect or missing Data!');
        }
        if ('material' in dismantledItem && 'actualDismantledQty' in dismantledItem) {
            const dismantledmaterial = {
                material: (0, dataValidator_1.parseId)(dismantledItem.material.id),
                actualDismantledQty: (0, dataProcessor_1.parseQty)(dismantledItem.actualDismantledQty),
                recipeBomId: 'recipeBomId' in dismantledItem && dismantledItem.recipeBomId
                    ? (0, dataValidator_1.parseId)(dismantledItem.recipeBomId)
                    : undefined,
                reusable: 'reusable' in dismantledItem ? parseReusable(dismantledItem.reusable) : types_1.Reusable.NO,
                materialStatus: 'materialStatus' in dismantledItem
                    ? parseMaterialStatus(dismantledItem.materialStatus)
                    : types_1.MaterialStatus.SCRAPPED,
                rwDismantledMaterialId: 'rwDismantledMaterialId' in dismantledItem ? (0, dataValidator_1.parseId)(dismantledItem.rwDismantledMaterialId) : undefined,
            };
            // Renmove undefined recipe BOM ID for extera Material
            dismantledmaterial.recipeBomId =
                dismantledmaterial.recipeBomId === 0 ? undefined : dismantledmaterial.recipeBomId;
            dismantledMaterials.push(dismantledmaterial);
        }
        else {
            throw new Error('Incorrect or missing Data!');
        }
    }
    return dismantledMaterials;
};
const parseReworkActions = (reworkActions) => {
    if (!reworkActions || !Array.isArray(reworkActions)) {
        throw new Error('Incorrect or missing Data!');
    }
    const reworkActionsArray = [];
    for (const reworkAction of reworkActions) {
        reworkActionsArray.push((0, dataValidator_1.parseId)(reworkAction));
    }
    return reworkActionsArray;
};
const parseAffectedRecipe = (affectedRecipe) => {
    if (!affectedRecipe || !Array.isArray(affectedRecipe)) {
        throw new Error('Incorrect or missing Data!');
    }
    const affectedRecipeArray = [];
    for (const recipe of affectedRecipe) {
        affectedRecipeArray.push((0, dataValidator_1.parseId)(recipe));
    }
    return affectedRecipeArray;
};
const nokDataProcessor = (nokData) => {
    if (!nokData || typeof nokData !== 'object') {
        throw new Error('Incorrect or missing Data **!');
    }
    if ('productId' in nokData &&
        'productSN' in nokData &&
        'detectStationId' in nokData &&
        'detectShiftId' in nokData &&
        'initNokCodeId' in nokData &&
        'detectedTime' in nokData &&
        'nokStatus' in nokData &&
        'productStatus' in nokData &&
        'removeReport' in nokData) {
        const nokDataToReturn = {
            productId: (0, dataValidator_1.parseId)(nokData.productId),
            productSN: parseProductSN(nokData.productSN),
            detectStationId: (0, dataValidator_1.parseId)(nokData.detectStationId),
            detectShiftId: (0, dataValidator_1.parseId)(nokData.detectShiftId),
            initNokCodeId: (0, dataValidator_1.parseId)(nokData.initNokCodeId),
            detectTime: (0, dataValidator_1.parseDate)(nokData.detectedTime),
            nokStatus: parseNokStatus(nokData.nokStatus),
            productStatus: parseProductStatus(nokData.productStatus),
            removeReport: (0, dataValidator_1.parseBoolean)(nokData.removeReport),
            description: 'description' in nokData ? (0, dataProcessor_1.parseDescription)(nokData.description) : '',
        };
        return nokDataToReturn;
    }
    else {
        throw new Error('Incorrect or missing data --+-+!');
    }
};
exports.nokDataProcessor = nokDataProcessor;
const reworkDataProcessor = (reworkData) => {
    if (!reworkData || typeof reworkData !== 'object') {
        throw new Error('Incorrect or missing Data **!');
    }
    if ('nokId' in reworkData && 'reworkShift' in reworkData && 'reworkOperator' in reworkData) {
        const reworkDataToReturn = {
            nokId: (0, dataValidator_1.parseId)(reworkData.nokId),
            reworkOperator: (0, dataProcessor_1.parseDescription)(reworkData.reworkOperator),
            //reworkOperator: parseId(reworkData.reworkOperator)
            reworkShiftId: (0, dataValidator_1.parseId)(reworkData.reworkShift),
            id: 'id' in reworkData ? (0, dataValidator_1.parseId)(reworkData.id) : undefined,
            reworkStationId: 'reworkStation' in reworkData ? (0, dataValidator_1.parseId)(reworkData.reworkStation) : undefined,
            reworkActionsId: 'reworkActionsId' in reworkData ? parseReworkActions(reworkData.reworkActionsId) : [],
            reworkTime: 'reworkTime' in reworkData ? (0, dataValidator_1.parseDate)(reworkData.reworkTime) : new Date(),
            reworkDuration: 'reworkDuration' in reworkData ? (0, dataProcessor_1.parseQty)(Number(reworkData.reworkDuration)) : 0,
            reworkManPower: 'reworkManPower' in reworkData ? (0, dataProcessor_1.parseQty)(Number(reworkData.reworkManPower)) : 0,
            affectedRecipes: 'affectedRecipes' in reworkData ? parseAffectedRecipe(reworkData.affectedRecipes) : [],
            dismantledMaterials: 'nokDismantleMaterials' in reworkData ? parseNokDismantledMaterial(reworkData.nokDismantleMaterials) : [],
            reworkNote: 'reworkNote' in reworkData ? (0, dataProcessor_1.parseDescription)(reworkData.reworkNote) : '',
            reworkStatus: 'reworkStatus' in reworkData ? parseReworkStatus(reworkData.reworkStatus) : types_1.ReworkStatus.PENDING,
        };
        return reworkDataToReturn;
    }
    else {
        throw new Error('Incorrect or missing data --+-+!');
    }
};
exports.reworkDataProcessor = reworkDataProcessor;
