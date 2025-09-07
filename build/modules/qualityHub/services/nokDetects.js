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
// Define NokDetect query
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
            as: 'detectedStation',
            attributes: ['id', 'stationName', 'stationCode'],
        },
        {
            model: models_1.NokCode,
            as: 'initNokCode',
            attributes: ['id', 'nokCode', 'nokDesc'],
        },
        {
            model: models_1.WorkShift,
            as: 'detectedShift',
            attributes: ['id', 'shiftName', 'shiftCode'],
        },
    ],
};
// Get all NokDetects
const getAllNokDetects = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nokDetects = yield models_1.NokDetect.findAll(query);
        return nokDetects;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Get a NokDetect based on ID
const getNokDetect = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nokDetect = yield models_1.NokDetect.findByPk(id, query);
    if (!nokDetect) {
        throw new Error('the nokDetect not found');
    }
    return nokDetect;
});
// Get NokDetects by product
const getNokDetectsByProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nokDetects = yield models_1.NokDetect.findAll(Object.assign({ where: { productId } }, query));
        return nokDetects;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Create a new NokDetect
const createNokDetect = (nokDetectData) => __awaiter(void 0, void 0, void 0, function* () {
    const newNokDetectData = (0, nokDataProcessor_1.nokDataProcessor)(nokDetectData);
    try {
        const nokDetect = yield models_1.NokDetect.create(newNokDetectData);
        return nokDetect;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update an NokDetect
const updateNokDetect = (id, nokDetectData) => __awaiter(void 0, void 0, void 0, function* () {
    const newNokDetectData = (0, nokDataProcessor_1.nokDataProcessor)(nokDetectData);
    try {
        const nokDetect = yield models_1.NokDetect.findByPk(id);
        if (!nokDetect) {
            throw new Error('NOK not found!');
        }
        const updatedNokDetect = yield nokDetect.update(newNokDetectData);
        return updatedNokDetect;
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
    getAllNokDetects,
    getNokDetect,
    getNokDetectsByProduct,
    createNokDetect,
    updateNokDetect,
};
