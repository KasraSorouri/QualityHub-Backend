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
const nokRcaProcessor_1 = require("../utils/nokRcaProcessor");
// Get all Costs
const getAllRcas = () => __awaiter(void 0, void 0, void 0, function* () {
    const rcas = yield models_1.Rca.findAll();
    return rcas;
});
// Get a Rca by ID
const getRca = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rca = yield models_1.Rca.findByPk(id);
    if (!rca) {
        throw new Error('the rca not found');
    }
    return rca;
});
// Get a RCA by NOK ID
const getNokRcaByNok = (nokId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nokRcas = yield models_1.Rca.findAll({
            where: { nokId },
            include: [models_1.RcaCode],
        });
        return nokRcas;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Create a new Cost
const createNokRca = (nokRcaData) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate data
    const newNokRcaData = (0, nokRcaProcessor_1.nokRcaProcessor)(nokRcaData);
    try {
        const [result] = yield models_1.Rca.upsert(newNokRcaData);
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
// Remove a Rca
const deleteRca = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.Rca.destroy({
            where: { id },
        });
        return result ? true : false;
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
    getAllRcas,
    getRca,
    getNokRcaByNok,
    createNokRca,
    deleteRca,
};
