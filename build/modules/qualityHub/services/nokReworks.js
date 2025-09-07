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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
const types_1 = require("../types");
const nokDataProcessor_1 = require("../utils/nokDataProcessor");
const nokDetects_1 = __importDefault(require("./nokDetects"));
// Define Rework query
const query = {
    attributes: { exclude: [] },
    include: [
        {
            model: models_1.NokDismantleMaterials,
            attributes: { exclude: [] },
            include: [
                {
                    model: models_1.Material,
                    as: 'material',
                    attributes: ['id', 'itemShortName', 'itemLongName', 'itemCode', 'price', 'unit', 'traceable', 'active'],
                },
                {
                    model: models_1.RwDismantledMaterials,
                    as: 'rwDismantledMaterial',
                    attributes: { exclude: ['id', 'reworkId', 'recipeBomId'] },
                },
                {
                    model: models_1.RecipeBoms,
                    as: 'recipeBom',
                    attributes: { exclude: ['id', 'recipeId', 'materialId'] },
                    include: [
                        {
                            model: models_1.Recipe,
                            as: 'recipe',
                            attributes: ['id', 'recipeCode', 'description', 'recipeType'],
                        },
                    ],
                },
            ],
        },
        {
            model: models_1.WorkShift,
            as: 'reworkShift',
        },
        {
            model: models_1.Recipe,
        },
        {
            model: models_1.Station,
            as: 'reworkStation',
        },
    ],
};
// Get all Reworks
const getAllReworks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reworks = yield models_1.NokRework.findAll();
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
    const rework = yield models_1.NokRework.findByPk(id);
    if (!rework) {
        throw new Error('the rework not found');
    }
    return rework;
});
// Get Reworks by Nok ID
const getReworksByNok = (nokId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reworks = yield models_1.NokRework.findAll({
            where: { nokId },
            attributes: query.attributes,
            include: query.include,
        });
        const result = reworks[0];
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
// Create Or Update a Rework
const createRework = (reworkData) => __awaiter(void 0, void 0, void 0, function* () {
    const newReworkData = (0, nokDataProcessor_1.reworkDataProcessor)(reworkData);
    try {
        const [rework] = yield models_1.NokRework.upsert(newReworkData);
        if (!rework) {
            throw new Error('Rework not Saved - Call Administrator!');
        }
        // Update Nok Data
        const nok = yield nokDetects_1.default.getNokDetect(rework.nokId);
        // Update Nok Product Status
        nok.productStatus =
            rework.reworkStatus === types_1.ReworkStatus.COMPLETED ? types_1.ProductStatus.REWORKED : types_1.ProductStatus.REWORK_INPROGRESS;
        yield nok.update({ productStatus: nok.productStatus });
        if (rework.id && 'dismantledMaterials' in newReworkData && newReworkData.dismantledMaterials) {
            yield handleDismantledMaterials(rework.id, newReworkData.dismantledMaterials);
        }
        return rework;
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
    const rework = yield models_1.NokRework.findByPk(reworkId);
    if (rework) {
        // delete previous rework Boms
        yield models_1.NokDismantleMaterials.destroy({ where: { rework_id: rework.id } });
        for (const item of dismantledMaterialData) {
            const dismantled = {
                nokId: rework.nokId,
                reworkId: rework.id,
                materialId: item.material,
                recipeBomId: item.recipeBomId,
                reusable: item.reusable,
                actualDismantledQty: item.actualDismantledQty,
                materialStatus: item.materialStatus,
                ClaimStatus: types_1.ClaimStatus.PENDING,
                rwDismantledMaterialId: item.rwDismantledMaterialId,
            };
            yield models_1.NokDismantleMaterials.create(dismantled);
        }
        try {
            const result = yield models_1.NokRework.findByPk(reworkId);
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
    getReworksByNok,
    createRework,
};
