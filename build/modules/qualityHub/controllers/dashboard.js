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
const dashboard_1 = __importDefault(require("../services/dashboard"));
const NokDashboardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.body || {};
    try {
        const data = yield dashboard_1.default.nokDashboard(params);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching dashboard data.' });
    }
});
const nokAnalysedDashboardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.body || {};
    try {
        const data = yield dashboard_1.default.nokAnalysedDashboard(params);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching analysed NOK data.' });
    }
});
const NokDashboardControllerTopNok = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.body || {};
    try {
        const data = yield dashboard_1.default.topNokCodes(params);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching top NOK data.' });
    }
});
exports.default = {
    NokDashboardController,
    nokAnalysedDashboardController,
    NokDashboardControllerTopNok,
};
