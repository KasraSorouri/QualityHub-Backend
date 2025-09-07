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
const dataProcessor_1 = require("../utils/dataProcessor");
// Define NOK Code query
const query = {
    attributes: { exclude: [] },
    include: [
        {
            model: models_1.NokGrp,
            as: 'nokGrp',
            attributes: ['nokGrpName', 'nokGrpCode', 'nokGrpDesc', 'id'],
        },
    ],
};
// Get all Noks
const getAllNokCodes = () => __awaiter(void 0, void 0, void 0, function* () {
    //const noks = await Nok.findAll(query);
    const nokCodes = yield models_1.NokCode.findAll(query);
    return nokCodes;
});
// Get a Nok based on ID
const getNokCode = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nokCode = yield models_1.NokCode.findByPk(id, query);
    if (!nokCode) {
        throw new Error('the nok group not found');
    }
    return nokCode;
});
// Create a new Nok Group
const createNokCode = (nokCodeData) => __awaiter(void 0, void 0, void 0, function* () {
    const newNokCodeData = (0, dataProcessor_1.nokCodeProcessor)(nokCodeData);
    try {
        const nokCode = yield models_1.NokCode.create(newNokCodeData);
        return nokCode;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update an Nok
const updateNokCode = (id, nokCodeData) => __awaiter(void 0, void 0, void 0, function* () {
    const newNokCodeData = (0, dataProcessor_1.nokCodeProcessor)(nokCodeData);
    try {
        const nokCode = yield models_1.NokCode.findByPk(id);
        if (!nokCode) {
            throw new Error('Nok Group not found!');
        }
        const updatedNokCode = yield nokCode.update(newNokCodeData);
        return updatedNokCode;
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
    getAllNokCodes,
    getNokCode,
    createNokCode,
    updateNokCode,
};
