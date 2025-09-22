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
const iqcManager_1 = __importDefault(require("../services/iqcManager"));
// Get All IQCs
const getAllIQCs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const iqcs = yield iqcManager_1.default.getAllIQCs();
        res.json(iqcs);
    }
    catch (err) {
        res.status(400).json({ error: 'No IQC found' });
    }
});
// Get Pending IQCs
const getPendingIQCs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const iqcs = yield iqcManager_1.default.getPendingIQCs();
        res.json(iqcs);
    }
    catch (err) {
        res.status(400).json({ error: 'No IQC found' });
    }
});
// Update Material Status
const updateMaterialStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { materialStatus } = req.body;
    try {
        const material = yield iqcManager_1.default.updateMaterialStatus(Number(id), materialStatus);
        res.json(material);
    }
    catch (err) {
        res.status(400).json({ error: 'IQC not found' });
    }
});
exports.default = {
    getAllIQCs,
    getPendingIQCs,
    updateMaterialStatus,
};
