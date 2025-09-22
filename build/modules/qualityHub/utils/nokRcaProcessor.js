"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nokRcaProcessor = void 0;
const dataValidator_1 = require("../../../utils/dataValidator");
const dataProcessor_1 = require("./dataProcessor");
const nokRcaProcessor = (nokRcaData) => {
    // Validate input data
    if (!nokRcaData || typeof nokRcaData !== 'object' || !('nokId' in nokRcaData) || !('rcaCodeId' in nokRcaData)) {
        throw new Error('Incorrect or missing Data ** NOK RCA');
    }
    const newRcaData = {
        id: 'id' in nokRcaData ? (0, dataValidator_1.parseId)(nokRcaData.id) : undefined,
        nokId: (0, dataValidator_1.parseId)(nokRcaData.nokId),
        rcaCodeId: (0, dataValidator_1.parseId)(nokRcaData.rcaCodeId),
        whCauseId: 'whCauseId' in nokRcaData ? (0, dataValidator_1.parseId)(Number(nokRcaData.whCauseId)) : undefined,
        whCauseName: 'whCauseName' in nokRcaData ? (0, dataProcessor_1.parseDescription)(nokRcaData.whCauseName) : undefined,
        description: 'description' in nokRcaData ? (0, dataProcessor_1.parseDescription)(nokRcaData.description) : undefined,
        improveSuggestion: 'improveSuggestion' in nokRcaData ? (0, dataProcessor_1.parseDescription)(nokRcaData.improveSuggestion) : undefined,
        createBy: 1,
        createAt: new Date(),
    };
    return newRcaData;
};
exports.nokRcaProcessor = nokRcaProcessor;
