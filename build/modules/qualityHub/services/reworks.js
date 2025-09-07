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
const reworkDataProcessor_1 = require("../utils/reworkDataProcessor");
//import { Rework, Product, ReworkQuery, Station, ReworkBoms, Material } from '../../../models';
//import { ConsumingMaterial, Reusable } from '../types';
//import { reworkProcessor } from '../utils/dataProcessor';
// Define Rework query
const query = {
    attributes: { exclude: [] },
    include: [
        {
            model: models_1.Product,
            as: 'product',
            attributes: ['id', 'productName', 'productCode'],
        },
        {
            model: models_1.Station,
            as: 'station',
            attributes: ['id', 'stationName', 'stationCode'],
        },
        {
            model: models_1.NokCode,
            as: 'nokCode',
            attributes: ['id', 'nokCode'],
        },
        {
            model: models_1.RwDismantledMaterials,
            as: 'rwDismantledMaterials',
            attributes: ['id', 'dismantledQty', 'note', 'mandatoryRemove'],
            include: [
                {
                    model: models_1.RecipeBoms,
                    as: 'recipeBom',
                    attributes: ['id', 'qty', 'reusable'],
                    include: [
                        {
                            model: models_1.Material,
                            as: 'material',
                            attributes: ['id', 'itemShortName', 'itemLongName', 'itemCode', 'price', 'unit', 'traceable', 'active'],
                        },
                        {
                            model: models_1.Recipe,
                            as: 'recipe',
                            attributes: ['recipeCode'],
                        },
                    ],
                },
            ],
        },
    ],
};
// Get all Reworks
const getAllReworks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reworks = yield models_1.Rework.findAll(query);
        return reworks;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Get a Rework based on ID
const getRework = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rework = yield models_1.Rework.findByPk(id, query);
    if (!rework) {
        throw new Error('the rework not found');
    }
    return rework;
});
// Get Reworks by product
const getReworksByProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reworks = yield models_1.Rework.findAll(Object.assign({ where: { productId } }, query));
        return reworks;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Create a new Rework
const createRework = (reworkData) => __awaiter(void 0, void 0, void 0, function* () {
    // test data
    const newReworkData = (0, reworkDataProcessor_1.reworkDataProcessor)(reworkData);
    try {
        const rework = yield models_1.Rework.create(newReworkData);
        if (rework.id && 'dismantledMaterials' in newReworkData && newReworkData.dismantledMaterials) {
            yield handleDismantledMaterials(rework.id, newReworkData.dismantledMaterials);
        }
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
    return null;
});
// Update an Rework
const updateRework = (id, reworkData) => __awaiter(void 0, void 0, void 0, function* () {
    // test data
    const newReworkData = (0, reworkDataProcessor_1.reworkDataProcessor)(reworkData);
    try {
        const rework = yield models_1.Rework.findByPk(id);
        if (!rework) {
            throw new Error('Rework not found!');
        }
        // check that the rework is deprecated before
        const isDeprecated = rework.deprecatedDate;
        if (!isDeprecated && newReworkData.deprecated) {
            newReworkData.deprecatedDate = new Date();
        }
        const updatedRework = yield rework.update(newReworkData);
        return updatedRework;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
const handleDismantledMaterials = (reworkId, dismantledMaterialData) => __awaiter(void 0, void 0, void 0, function* () {
    const rework = yield models_1.Rework.findByPk(reworkId);
    if (rework) {
        // delete previous rework Boms
        //await RwDismantledMaterials.destroy({ where: { 'reworkId' : rework.id}})
        // create new rework Boms
        const dismantledMaterials = [];
        for (const item of dismantledMaterialData) {
            const dismantled = {
                reworkId: rework.id,
                recipeBomId: item.recipeBomId,
                //recipeId: item.recipeId,
                //materialId: item.materialId,
                dismantledQty: item.dismantledQty,
                note: item.note,
                mandatoryRemove: item.mandatoryRemove,
            };
            yield models_1.RwDismantledMaterials.create(dismantled);
            dismantledMaterials.push(dismantled);
        }
        try {
            //await RwDismantledMaterials.bulkCreate(dismantledMaterials);
            const result = yield models_1.Rework.findByPk(reworkId, query);
            if (!result) {
                throw new Error('Rework not found!');
            }
            return result;
        }
        catch (err) {
            let errorMessage = '';
            if (err instanceof Error) {
                errorMessage += ' Error: ' + err.message;
            }
            throw new Error(errorMessage);
        }
    }
    else {
        throw new Error('Rework not found!');
    }
});
exports.default = {
    getAllReworks,
    getRework,
    getReworksByProduct,
    createRework,
    updateRework,
};
