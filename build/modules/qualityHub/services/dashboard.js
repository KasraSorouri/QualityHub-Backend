"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const sequelize_1 = __importStar(require("sequelize"));
const dashboardDataProcessor_1 = __importDefault(require("../utils/dashboardDataProcessor"));
const nokDashboard = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // converting Parameters
    const processedParams = dashboardDataProcessor_1.default.analysedNokQuery(params);
    const detectTimeCondition = processedParams.detectTimeCondition;
    const productRange = processedParams.productRange || [];
    const shiftRange = processedParams.shiftRange || [];
    const andCondition = [{ removeReport: false }];
    if (detectTimeCondition) {
        andCondition.push({ detect_time: detectTimeCondition });
    }
    if (productRange.length > 0) {
        andCondition.push({ product_id: { [sequelize_1.Op.in]: productRange } });
    }
    if (shiftRange.length > 0) {
        andCondition.push({ detectShiftId: { [sequelize_1.Op.in]: shiftRange } });
    }
    const whereCondition = {
        [sequelize_1.Op.and]: andCondition,
    };
    // Fetching dashboard data for NOK analysis
    try {
        const dashboardNokData = yield models_1.NokDetect.findAll({
            include: [
                {
                    model: models_1.Product,
                    as: 'product',
                    attributes: [],
                },
                {
                    model: models_1.NokAnalyse,
                    as: 'nokAnalyse',
                    required: false,
                    attributes: [],
                },
            ],
            where: whereCondition,
            attributes: [
                [sequelize_1.default.col('product.product_name'), 'product'],
                'nokStatus',
                [sequelize_1.default.fn('COUNT', sequelize_1.default.col('nokDetect.id')), 'count'],
            ],
            group: ['product', 'nokStatus'],
            raw: true,
        });
        // Preparing the dashboard data for response
        const rawNokData = dashboardNokData.map((item) => ({
            product: item.product,
            nokStatus: item.nokStatus,
            count: Number(item.count)
        }));
        const dashboardNokDataFormatted = dashboardDataProcessor_1.default.nokDataFormatter(rawNokData);
        return dashboardNokDataFormatted;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching NOK data:', error.message);
        }
        else {
            console.error('Error fetching NOK data:', error);
        }
        throw new Error('Failed to fetch NOK dashboard data');
    }
    throw new Error('Failed to fetch NOK dashboard data');
});
const nokAnalysedDashboard = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // converting Parameters
    const processedParams = dashboardDataProcessor_1.default.analysedNokQuery(params);
    const detectTimeCondition = processedParams.detectTimeCondition;
    const productRange = processedParams.productRange || [];
    const shiftRange = processedParams.shiftRange || [];
    const andCondition = [{ '$nokDetect.remove_report$': false }];
    if (detectTimeCondition) {
        andCondition.push({ '$nokDetect.detect_time$': detectTimeCondition });
    }
    if (productRange.length > 0) {
        andCondition.push({ '$nokDetect.product_id$': { [sequelize_1.Op.in]: productRange } });
    }
    if (shiftRange.length > 0) {
        andCondition.push({
            '$nokDetect.detect_shift_id$': { [sequelize_1.Op.in]: shiftRange },
        });
    }
    const whereCondition = {
        [sequelize_1.Op.and]: andCondition,
    };
    // Fetching analysed dashboard data for NOK analysis
    try {
        const analysedNokData = yield models_1.NokAnalyse.findAll({
            include: [
                {
                    model: models_1.NokDetect,
                    as: 'nokDetect',
                    required: true,
                    attributes: [],
                    include: [
                        {
                            model: models_1.Product,
                            as: 'product',
                            attributes: [],
                        },
                    ],
                },
                {
                    model: models_1.WorkShift,
                    as: 'causeShift',
                    attributes: [],
                },
            ],
            where: whereCondition,
            attributes: [
                [sequelize_1.default.col('nokDetect.product.product_name'), 'productName'],
                [sequelize_1.default.col('causeShift.shift_name'), 'shiftName'],
                [sequelize_1.default.fn('COUNT', sequelize_1.default.col('nokAnalyse.id')), 'count'],
            ],
            group: ['nokDetect.product.product_name', 'causeShift.shift_name'],
            raw: true,
        });
        // Preparing the analysed NOK data for response
        const rawAnalysedNokData = analysedNokData.map((item) => ({
            productName: item.productName,
            shiftName: item.shiftName,
            count: item.count,
        }));
        const analysedNokDataFormatted = dashboardDataProcessor_1.default.analysedDataFormatter(rawAnalysedNokData);
        return analysedNokDataFormatted;
    }
    catch (error) {
        console.error('Error fetching analysed NOK data:', error);
        throw new Error('Failed to fetch NOK analysed dashboard data');
    }
});
// Top N NOK Codes
const topNokCodes = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // converting Parameters
    const processedParams = dashboardDataProcessor_1.default.analysedNokQuery(params);
    const detectTimeCondition = processedParams.detectTimeCondition;
    const productRange = processedParams.productRange || [];
    const shiftRange = processedParams.shiftRange || [];
    const topN = processedParams.topN || 10;
    const andCondition = [{ '$nokDetect.remove_report$': false }];
    if (detectTimeCondition) {
        andCondition.push({ '$nokDetect.detect_time$': detectTimeCondition });
    }
    if (productRange.length > 0) {
        andCondition.push({ '$nokDetect.product_id$': { [sequelize_1.Op.in]: productRange } });
    }
    if (shiftRange.length > 0) {
        andCondition.push({ causeShiftId: { [sequelize_1.Op.in]: shiftRange } });
    }
    const whereCondition = {
        [sequelize_1.Op.and]: andCondition,
    };
    // Fetching top N NOK codes
    try {
        const topNokCodes = yield models_1.NokAnalyse.findAll({
            include: [
                {
                    model: models_1.NokDetect,
                    as: 'nokDetect',
                    required: true,
                    attributes: [],
                    include: [
                        {
                            model: models_1.Product,
                            as: 'product',
                            attributes: [],
                        },
                    ],
                },
                {
                    model: models_1.WorkShift,
                    as: 'causeShift',
                    attributes: [],
                },
                {
                    model: models_1.NokCode,
                    as: 'nokCode',
                    attributes: [],
                },
            ],
            where: whereCondition,
            attributes: [
                [sequelize_1.default.col('nokDetect.product.product_name'), 'productName'],
                [sequelize_1.default.col('nokCode.nok_code'), 'nokCode'],
                [sequelize_1.default.fn('COUNT', sequelize_1.default.col('nokAnalyse.id')), 'count'],
                [sequelize_1.default.col('causeShift.shift_name'), 'shiftName'],
            ],
            group: ['nokCode.nok_code', 'nokDetect.product.product_name', 'causeShift.shift_name'],
            order: [[sequelize_1.default.fn('COUNT', sequelize_1.default.col('nokAnalyse.id')), 'DESC']],
            limit: topN,
            raw: true,
        });
        // Preparing the top N NOK codes data for response
        const topNokCodesMapped = topNokCodes.map((item) => ({
            productName: item.productName,
            nokCode: item.nokCode,
            shiftName: item.shiftName,
            count: item.count,
        }));
        const topNokCodesFormatted = dashboardDataProcessor_1.default.topNDataFormatter(topNokCodesMapped);
        return topNokCodesFormatted;
    }
    catch (error) {
        throw new Error('Failed to fetch top NOK codes');
    }
});
exports.default = {
    nokDashboard,
    nokAnalysedDashboard,
    topNokCodes,
};
