"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const types_1 = require("../types");
const analysedNokQuery = (params) => {
    const queryParams = {
        detectTimeCondition: {},
        productRange: [],
        shiftRange: [],
    };
    // Process Date Range
    if ('startDate' in params || 'endDate' in params) {
        console.log('Processing parameters for analysed NOK query:', params);
        const { startDate, endDate } = params;
        console.log('Start Date:', startDate, 'End Date:', endDate);
        if (startDate && endDate) {
            queryParams.detectTimeCondition[sequelize_1.default.Op.between] = [startDate, endDate];
        }
        else if (startDate) {
            queryParams.detectTimeCondition[sequelize_1.default.Op.gte] = startDate;
        }
        else if (endDate) {
            queryParams.detectTimeCondition[sequelize_1.default.Op.lte] = endDate;
        }
        else {
            delete queryParams.detectTimeCondition;
        }
    }
    else {
        delete queryParams.detectTimeCondition;
    }
    // Process Product Range
    if (params.productId && Array.isArray(params.productId)) {
        queryParams.productRange = params.productId.map((id) => parseInt(id));
    }
    else if (params.productId && typeof params.productId === 'string') {
        queryParams.productRange = [parseInt(params.productId)];
    }
    else {
        delete queryParams.productRange;
    }
    // Process Shift Range
    if (params.shiftId && Array.isArray(params.shiftId)) {
        queryParams.shiftRange = params.shiftId.map((id) => parseInt(id));
    }
    else if (params.shiftId && typeof params.shiftId === 'string') {
        queryParams.shiftRange = [parseInt(params.shiftId)];
    }
    else {
        delete queryParams.shiftRange;
    }
    // Process Top N
    if (params.topN) {
        queryParams.topN = typeof params.topN === 'string' ? parseInt(params.topN) : params.topN;
    }
    else {
        delete queryParams.topN;
    }
    return queryParams;
};
const nokDataFormatter = (dashboardNokData) => {
    const formattedData = [];
    const Data = Object.values(dashboardNokData.reduce((acc, item) => {
        if (!acc[item.product.productName]) {
            acc[item.product.productName] = {
                productName: item.product.productName,
                pending: 0,
                analysed: 0,
            };
        }
        if (item.nokStatus === types_1.NokStatus.PENDING) {
            acc[item.product.productName].pending += Number(item.count);
        }
        else if (item.nokStatus === types_1.NokStatus.ANALYSED) {
            acc[item.product.productName].analysed += Number(item.count);
        }
        return acc;
    }, {}));
    for (const item of Data) {
        formattedData.push(item);
    }
    return formattedData;
};
const analysedDataFormatter = (analysedNokData) => {
    console.log('Analysed Data:', analysedNokData);
    // Collect all unique shifts
    const allShifts = Array.from(new Set(analysedNokData.map((item) => item.shiftName)));
    // Build Report Structure
    const data = Object.values(analysedNokData.reduce((acc, item) => {
        if (!acc[item.productName]) {
            acc[item.productName] = {
                productName: item.productName,
                shifts: {},
            };
            allShifts.forEach((shift) => {
                acc[item.productName].shifts[shift] = 0;
            });
        }
        acc[item.productName].shifts[item.shiftName] = item.count;
        return acc;
    }, {}));
    const formattedData = {
        shifts: allShifts,
        productsNok: data,
    };
    return formattedData;
};
// Formatting the Top N NOK Codes Data for Response
const topNDataFormatter = (topNData) => {
    // Collect all unique shifts
    const allShifts = Array.from(new Set(topNData.map((item) => item.shiftName)));
    // Build Report Structure
    const data = Object.values(topNData.reduce((acc, item) => {
        const key = `${item.productName}-${item.nokCode}`;
        const count = Number(item.count);
        if (!acc[key]) {
            acc[key] = {
                productName: item.productName,
                nokCode: item.nokCode,
                count: 0,
                shifts: {},
            };
            allShifts.forEach((shift) => {
                acc[key].shifts[shift] = 0;
            });
        }
        acc[key].count += count;
        acc[key].shifts[item.shiftName] = item.count;
        return acc;
    }, {}));
    const formattedData = {
        shifts: allShifts,
        TopNok: data,
    };
    return formattedData;
};
exports.default = {
    analysedNokQuery,
    nokDataFormatter,
    analysedDataFormatter,
    topNDataFormatter,
};
