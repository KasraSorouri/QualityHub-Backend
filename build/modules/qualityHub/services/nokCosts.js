"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
const types_1 = require("../types");
const nokCostProcessor_1 = require("../utils/nokCostProcessor");
// Get Dismantled Material By Nok Id
const getDismantledMaterialByNok = (nokId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dismantledMaterial = yield models_1.NokDismantleMaterials.findAll({
            where: { nokId },
            include: [
                {
                    model: models_1.Material,
                },
            ],
        });
        return dismantledMaterial;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Calculate Costs For Nok Id
const calculateNokCost = (nokId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalMaterialWaste = {};
        let issue = false;
        const claimStatus = {
            pendding: 0,
            approved: 0,
            rejected: 0,
        };
        const dismantledMaterial = yield models_1.NokDismantleMaterials.findAll({
            where: { nokId: nokId },
        });
        // update unit price
        for (const item of dismantledMaterial) {
            if (item.unitPrice == 0) {
                yield updateUnitPrice(item);
                issue = true;
            }
            // Calculate Total Cost
            const { materialStatus, actualDismantledQty, unitPrice } = item;
            const totalCost = actualDismantledQty * unitPrice;
            if (totalMaterialWaste[materialStatus]) {
                totalMaterialWaste[materialStatus] += totalCost;
            }
            else {
                totalMaterialWaste[materialStatus] = totalCost;
            }
            // Analyse Clame Status
            if (item.materialStatus === types_1.MaterialStatus.CLAIMABLE && item.claimStatus === types_1.ClaimStatus.PENDING) {
                claimStatus.pendding += 1;
            }
            if (item.materialStatus === types_1.MaterialStatus.CLAIMABLE && item.claimStatus === types_1.ClaimStatus.ACCEPTED) {
                claimStatus.approved += 1;
            }
            if (item.materialStatus === types_1.MaterialStatus.CLAIMABLE && item.claimStatus === types_1.ClaimStatus.DENIED) {
                claimStatus.rejected += 1;
            }
        }
        ;
        totalMaterialWaste.issue = issue ? 1 : 0;
        return Object.assign(Object.assign({}, totalMaterialWaste), claimStatus);
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update Price Data
const updateUnitPrice = (dismantledMaterial) => __awaiter(void 0, void 0, void 0, function* () {
    // Find missed Price
    const material = yield models_1.Material.findByPk(dismantledMaterial.materialId);
    dismantledMaterial.unitPrice = (material === null || material === void 0 ? void 0 : material.price) || 0;
    yield dismantledMaterial.save();
});
// Create a new Cost
const createNokCost = (costData) => __awaiter(void 0, void 0, void 0, function* () {
    // test data
    const newCostData = (0, nokCostProcessor_1.nokCostDataProcessor)(costData);
    try {
        const totalMaterialWaste = {};
        const data = yield models_1.NokDismantleMaterials.findAll({
            where: { nokId: newCostData.nokId },
        });
        // Calculate Material Waste
        for (const dismantledMaterial of data) {
            const { materialStatus, materialId, actualDismantledQty } = dismantledMaterial;
            const material = yield models_1.Material.findByPk(materialId);
            if (material && material.price) {
                const totalCost = actualDismantledQty * ((material === null || material === void 0 ? void 0 : material.price) || 0);
                if (totalMaterialWaste[materialStatus]) {
                    totalMaterialWaste[materialStatus] += totalCost;
                }
                else {
                    totalMaterialWaste[materialStatus] = totalCost;
                }
            }
            else {
                throw new Error('Material not found for id ' + materialId);
            }
        }
        // Calculate Time Waste
        let totalTimeWaste = 0;
        // find rework
        const rework = yield models_1.NokRework.findByPk(newCostData.reworkId);
        if (rework) {
            // find recipes and calculate total time Waste
            for (const affectedRecipe of rework.affectedRecipes) {
                const recipe = yield models_1.Recipe.findByPk(affectedRecipe);
                if (recipe) {
                    totalTimeWaste += recipe.timeDuration ? recipe.timeDuration : 0;
                }
            }
        }
        const nokCost = {
            nokId: newCostData.nokId,
            reworkId: newCostData.reworkId,
            materialWaste: Object.values(totalMaterialWaste).reduce((sum, value) => sum + value, 0),
            timeWaste: totalTimeWaste,
            editLocked: false,
            updatedAt: new Date(),
        };
        const result = yield models_1.NokCost.create(nokCost);
        return result;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
exports.default = {
    //getAllCosts,
    //getCost,
    //getCostsByNok,
    getDismantledMaterialByNok,
    createNokCost,
    calculateNokCost,
    //updateCost,
};
