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
// Define RcaCode query
const query = {
    attributes: { exclude: [] },
};
// Get all RcaCodes
const getAllRcaCodes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rcaCodes = yield models_1.RcaCode.findAll(query);
        return rcaCodes;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Get a RcaCode based on ID
const getRcaCode = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rcaCode = yield models_1.RcaCode.findByPk(id, query);
    if (!rcaCode) {
        throw new Error('the rcaCode not found');
    }
    return rcaCode;
});
// Create a new RcaCode
const createRcaCode = (rcaCodeData) => __awaiter(void 0, void 0, void 0, function* () {
    const newRcaCodeData = (0, dataProcessor_1.rcaCodeProcessor)(rcaCodeData);
    try {
        const rcaCode = yield models_1.RcaCode.create(newRcaCodeData);
        return rcaCode;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update an RcaCode
const updateRcaCode = (id, rcaCodeData) => __awaiter(void 0, void 0, void 0, function* () {
    const newRcaCodeData = (0, dataProcessor_1.rcaCodeProcessor)(rcaCodeData);
    try {
        const rcaCode = yield models_1.RcaCode.findByPk(id);
        if (!rcaCode) {
            throw new Error('RcaCode not found!');
        }
        const updatedRcaCode = yield rcaCode.update(newRcaCodeData);
        return updatedRcaCode;
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
    getAllRcaCodes,
    getRcaCode,
    createRcaCode,
    updateRcaCode,
};
