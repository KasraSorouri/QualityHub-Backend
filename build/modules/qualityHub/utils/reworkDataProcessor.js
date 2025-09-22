"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reworkDataProcessor = void 0;
const dataValidator_1 = require("../../../utils/dataValidator");
const dataProcessor_1 = require("./dataProcessor");
const parseRecipeData = (recipeData) => {
    if (!recipeData || !Array.isArray(recipeData)) {
        throw new Error('Incorrect or missing Data!');
    }
    const recipeIds = [];
    for (const recipe of recipeData) {
        recipeIds.push((0, dataValidator_1.parseId)(recipe));
    }
    return recipeIds;
};
const parseDismantlesMaterial = (dismantlesMaterialData) => {
    if (!dismantlesMaterialData || !Array.isArray(dismantlesMaterialData)) {
        throw new Error('Incorrect or missing Data!');
    }
    const dismantledMaterials = [];
    for (const dismantledItem of dismantlesMaterialData) {
        if (!dismantledItem || typeof dismantledItem !== 'object') {
            throw new Error('Incorrect or missing Data!');
        }
        if ('recipeBom' in dismantledItem &&
            typeof dismantledItem.recipeBom === 'object' &&
            'dismantledQty' in dismantledItem) {
            const dismantledmaterial = {
                recipeBomId: (0, dataValidator_1.parseId)(dismantledItem.recipeBom.id),
                dismantledQty: (0, dataProcessor_1.parseQty)(dismantledItem.dismantledQty),
                note: 'note' in dismantledItem ? (0, dataProcessor_1.parseDescription)(dismantledItem.note) : '',
                mandatoryRemove: 'mandatoryRemove' in dismantledItem ? (0, dataProcessor_1.parseActive)(dismantledItem.mandatoryRemove) : false,
            };
            dismantledMaterials.push(dismantledmaterial);
        }
        else {
            throw new Error('Incorrect or missing Data!');
        }
    }
    return dismantledMaterials;
};
const reworkDataProcessor = (reworkData) => {
    if (!reworkData || typeof reworkData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('productId' in reworkData &&
        'stationId' in reworkData &&
        'nokCodeId' in reworkData &&
        'reworkShortDesc' in reworkData &&
        'order' in reworkData) {
        const reworkDataToReturn = {
            productId: (0, dataValidator_1.parseId)(reworkData.productId),
            stationId: (0, dataValidator_1.parseId)(reworkData.stationId),
            nokCodeId: (0, dataValidator_1.parseId)(reworkData.nokCodeId),
            reworkShortDesc: (0, dataProcessor_1.parseDescription)(reworkData.reworkShortDesc),
            description: 'description' in reworkData ? (0, dataProcessor_1.parseDescription)(reworkData.description) : '',
            order: (0, dataProcessor_1.parseOrder)(Number(reworkData.order)),
            timeDuration: 'timeDuration' in reworkData ? (0, dataProcessor_1.parseQty)(reworkData.timeDuration) : 0,
            active: 'active' in reworkData ? (0, dataProcessor_1.parseActive)(reworkData.active) : true,
            deprecated: 'deprecated' in reworkData ? (0, dataProcessor_1.parseActive)(reworkData.deprecated) : false,
            reworkRecipes: 'reworkRecipes' in reworkData ? parseRecipeData(reworkData.reworkRecipes) : [],
            affectedRecipes: 'affectedRecipes' in reworkData ? parseRecipeData(reworkData.affectedRecipes) : [],
            creationDate: new Date(),
            deprecatedDate: 'deprecatedDate' in reworkData ? (0, dataValidator_1.parseDate)(reworkData.deprecatedDate) : undefined,
            dismantledMaterials: 'rwDismantledMaterials' in reworkData ? parseDismantlesMaterial(reworkData.rwDismantledMaterials) : [],
        };
        return reworkDataToReturn;
    }
    else {
        throw new Error('Incorrect or missing data!');
    }
};
exports.reworkDataProcessor = reworkDataProcessor;
