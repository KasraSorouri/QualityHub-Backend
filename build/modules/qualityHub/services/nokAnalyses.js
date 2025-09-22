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
const nokAnalyseDataProcessor_1 = require("../utils/nokAnalyseDataProcessor");
const nokCosts_1 = __importDefault(require("./nokCosts"));
const query = {
    attributes: { exclude: [] },
    include: [
        {
            model: models_1.Station,
            as: 'causeStation',
            attributes: ['id', 'stationName', 'stationCode'],
        },
        {
            model: models_1.NokCode,
            as: 'nokCode',
            attributes: ['id', 'nokCode', 'nokDesc'],
        },
        {
            model: models_1.WorkShift,
            as: 'causeShift',
            attributes: ['id', 'shiftName', 'shiftCode'],
        },
        {
            model: models_1.ClassCode,
            as: 'classCode',
        },
    ],
};
// Get all Analyses
const getAllAnalyses = () => __awaiter(void 0, void 0, void 0, function* () {
    const analyses = yield models_1.NokAnalyse.findAll(query);
    return analyses;
});
// Get a Analyse by ID
const getAnalyse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const analyse = yield models_1.NokAnalyse.findByPk(id, query);
    if (!analyse) {
        throw new Error('the analyse not found');
    }
    return analyse;
});
// Get a Analyse by NOK ID
const getNokAnalyseByNok = (nokId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nokAnalyses = yield models_1.NokAnalyse.findAll({
            where: { nokId },
            attributes: query.attributes,
            include: query.include,
        });
        if (nokAnalyses.length === 0) {
            throw new Error(`No analyses found for nokId: ${nokId}`);
        }
        // add Nok Cost to the result
        const costResult = yield nokCosts_1.default.calculateNokCost(nokId);
        const result = Object.assign(Object.assign({}, nokAnalyses[0].toJSON()), { costResult });
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
// Create a new Analyse
const createNokAnalyse = (nokAnalyseData) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate data
    const newNokAnalyseData = (0, nokAnalyseDataProcessor_1.nokAnalyseDataProcessor)(nokAnalyseData);
    try {
        const [result] = yield models_1.NokAnalyse.upsert(newNokAnalyseData);
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
// Remove a Analyse
const deleteAnalyse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.NokAnalyse.destroy({
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
// Update Analyse Status
const updateAnalyseStatue = (nokId, newAnalyseStatusData) => __awaiter(void 0, void 0, void 0, function* () {
    const newAnalyseStatus = (0, nokAnalyseDataProcessor_1.analyaseStatusProcessor)(newAnalyseStatusData);
    try {
        // set Nok Analysed Status
        const nokAnalyse = yield models_1.NokAnalyse.findOne({ where: { nokId } });
        if (!nokAnalyse) {
            throw new Error('Analyse not found');
        }
        const nokDetect = yield models_1.NokDetect.findByPk(nokId);
        if (!nokDetect) {
            throw new Error('Nok Detect not found');
        }
        try {
            nokDetect.nokStatus = newAnalyseStatus.analyseStatus;
            nokDetect.removeReport = newAnalyseStatus.removeFromReportStatus;
            yield nokDetect.save();
        }
        catch (err) {
            let errorMessage = 'Cannot update the analyse status';
            if (err instanceof Error) {
                errorMessage += ' Error: ' + err.message;
            }
            throw new Error(errorMessage);
        }
        if (newAnalyseStatus.analyseStatus === types_1.NokStatus.ANALYSED) {
            nokAnalyse.closed = true;
            nokAnalyse.closeDate = new Date();
            yield nokAnalyse.save();
        }
        else {
            nokAnalyse.closed = false;
            yield nokAnalyse.save();
        }
        return true;
    }
    catch (err) {
        let errorMessage = 'Cannot update the analyse status';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
exports.default = {
    getAllAnalyses,
    getAnalyse,
    getNokAnalyseByNok,
    createNokAnalyse,
    deleteAnalyse,
    updateAnalyseStatue,
};
