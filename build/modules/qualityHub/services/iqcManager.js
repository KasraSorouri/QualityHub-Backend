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
const nokDataProcessor_1 = require("../utils/nokDataProcessor");
const query = {
    attributes: { exclude: [] },
    include: [
        {
            model: models_1.Material,
            as: 'material',
            attributes: ['id', 'itemShortName', 'itemLongName', 'itemCode', 'price', 'unit', 'traceable', 'active'],
        },
        {
            model: models_1.NokDetect,
            as: 'nokDetect',
            attributes: ['productSN', 'detectTime', 'description', 'productStatus', 'productId', 'detectShiftId'],
            include: [
                {
                    model: models_1.WorkShift,
                    as: 'detectedShift',
                    attributes: ['shiftCode'],
                },
                {
                    model: models_1.Product,
                    as: 'product',
                    attributes: ['productName', 'productCode'],
                },
            ],
        },
    ],
};
// Get All IQCs
const getAllIQCs = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('get All IQCs');
    try {
        const iqcs = yield models_1.NokDismantleMaterials.findAll({
            attributes: query.attributes,
            include: query.include,
        });
        console.log('*** IQC Manager * IQCs -> ', iqcs);
        return iqcs;
    }
    catch (err) {
        console.log('!!! IQC Manager * Error -> ', err);
        throw new Error('No IQC found');
    }
});
// Get all Pending IQCs
const getPendingIQCs = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('get All IQCs');
    try {
        const iqcs = yield models_1.NokDismantleMaterials.findAll({
            where: {
                materialStatus: 'IQC',
            },
            attributes: query.attributes,
            include: query.include,
            logging: console.log,
        });
        console.log('*** IQC Manager * IQCs -> ', iqcs);
        return iqcs;
    }
    catch (err) {
        console.log('!!! IQC Manager * Error -> ', err);
        throw new Error('No IQC found');
    }
});
// Update Material Status
const updateMaterialStatus = (id, materialStatusData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('update Material Status * id ->', id, ' Material status ->', materialStatusData);
    const newMaterialStatus = (0, nokDataProcessor_1.parseMaterialStatus)(materialStatusData);
    try {
        const material = yield models_1.NokDismantleMaterials.findByPk(id);
        console.log('IQC Manager * service * Update * material by Id ->', material);
        if (!material) {
            throw new Error('Material not found');
        }
        material.materialStatus = newMaterialStatus;
        yield material.save();
        return material;
    }
    catch (err) {
        console.log('!!! IQC Manager * Error -> ', err);
        throw new Error('IQC not found');
    }
});
exports.default = {
    getAllIQCs,
    getPendingIQCs,
    updateMaterialStatus,
};
