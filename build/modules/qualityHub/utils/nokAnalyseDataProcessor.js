"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyaseStatusProcessor = exports.nokAnalyseDataProcessor = void 0;
const dataValidator_1 = require("../../../utils/dataValidator");
const types_1 = require("../types");
const dataProcessor_1 = require("./dataProcessor");
const nokAnalyseDataProcessor = (nokData) => {
    if (!nokData || typeof nokData !== 'object') {
        throw new Error('Incorrect or missing Data **!');
    }
    if ('nokId' in nokData &&
        'nokCodeId' in nokData &&
        'causeStationId' in nokData &&
        'causeShiftId' in nokData &&
        'classCodeId' in nokData) {
        const nokDataToReturn = {
            nokId: (0, dataValidator_1.parseId)(nokData.nokId),
            nokCodeId: (0, dataValidator_1.parseId)(nokData.nokCodeId),
            causeStationId: (0, dataValidator_1.parseId)(nokData.causeStationId),
            causeShiftId: (0, dataValidator_1.parseId)(nokData.causeShiftId),
            classCodeId: (0, dataValidator_1.parseId)(nokData.classCodeId),
            description: 'description' in nokData ? (0, dataProcessor_1.parseDescription)(nokData.description) : '',
            updatedBy: 1,
            updatedAt: new Date(),
            closed: 'closed' in nokData ? (0, dataValidator_1.parseBoolean)(nokData.closed) : false,
        };
        if (nokDataToReturn.closed) {
            nokDataToReturn.closeDate = new Date();
        }
        if ('id' in nokData && nokData.id) {
            nokDataToReturn.id = (0, dataValidator_1.parseId)(nokData.id);
        }
        return nokDataToReturn;
    }
    else {
        console.log('Incorrect or missing data --+-+!');
        throw new Error('Incorrect or missing data --+-+!');
    }
};
exports.nokAnalyseDataProcessor = nokAnalyseDataProcessor;
const statusProcessor = (analyseStatusData) => {
    switch (analyseStatusData) {
        case 'ANALYSED':
            return types_1.NokStatus.ANALYSED;
        case 'NEED INVESTIGATION':
            return types_1.NokStatus.NEED_INVESTIGATION;
        case 'NOT FOUND':
            return types_1.NokStatus.NOT_FOUND;
        default:
            return types_1.NokStatus.PENDING;
    }
};
// Analyse Status processor
const analyaseStatusProcessor = (analyseStatusData) => {
    if (!analyseStatusData || typeof analyseStatusData !== 'object') {
        throw new Error('Incorrect or missing Data **!');
    }
    if ('analyseStatus' in analyseStatusData && 'removeFromReportStatus' in analyseStatusData) {
        return {
            analyseStatus: statusProcessor(analyseStatusData.analyseStatus),
            removeFromReportStatus: (0, dataValidator_1.parseBoolean)(analyseStatusData.removeFromReportStatus),
        };
    }
    else {
        throw new Error('Incorrect or missing Data in analyse Status**!');
    }
};
exports.analyaseStatusProcessor = analyaseStatusProcessor;
