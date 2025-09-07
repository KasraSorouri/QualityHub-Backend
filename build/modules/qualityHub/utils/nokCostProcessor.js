"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nokCostDataProcessor = void 0;
const dataValidator_1 = require("../../../utils/dataValidator");
const nokCostDataProcessor = (nokCostsData) => {
    // Validate input data
    if (!nokCostsData ||
        typeof nokCostsData !== 'object' ||
        !('nokId' in nokCostsData) ||
        !('reworkId' in nokCostsData) ||
        !('dismantledMaterial' in nokCostsData)) {
        throw new Error('Incorrect or missing Data ** NOK Cost * 0 *');
    }
    const nbokId = (0, dataValidator_1.parseId)(nokCostsData.nokId);
    const reworkId = (0, dataValidator_1.parseId)(nokCostsData.reworkId);
    if (!Array.isArray(nokCostsData.dismantledMaterial)) {
        throw new Error('Incorrect or missing Data ** NOK Cost * 1 *');
    }
    const materialCostData = [];
    for (const item of nokCostsData.dismantledMaterial) {
        console.log('** here ** ');
        console.log('NOk Cost Processing * item -> ', item);
        // Type guard to check if the item contains the required properties
        if (item && typeof item === 'object' && 'materialId' in item && 'unitPrice' in item) {
            const newItem = {
                materialId: (0, dataValidator_1.parseId)(item.materialId),
                unitPrice: Number(item.unitPrice),
            };
            materialCostData.push(newItem);
        }
        else {
            console.log('*Nok Costs Data Processing - Invalid Item', item);
        }
    }
    const newData = {
        nokId: nbokId,
        reworkId: reworkId,
        dismantledMaterial: materialCostData,
    };
    console.log('NOk Cost Processing Finish Successfully!');
    return newData;
};
exports.nokCostDataProcessor = nokCostDataProcessor;
