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
const nokAnalyses_1 = __importDefault(require("../services/nokAnalyses"));
// Get All Analyses
const getAllAnalyses = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rcas = yield nokAnalyses_1.default.getAllAnalyses();
        res.json(rcas);
    }
    catch (err) {
        res.status(500).json({ error: 'No rca found' });
    }
});
// Get a Analyse by Id
const getAnalyse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const rca = yield nokAnalyses_1.default.getAnalyse(Number(id));
        res.json(rca);
    }
    catch (err) {
        res.status(404).json({ error: 'Analyse not found' });
    }
});
// Get RCAs by Nok Id
const getNokAnalyseByNok = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nokId = Number(req.params.id);
    if (!nokId) {
        res.status(400).json({ error: 'Invalid product id' });
    }
    try {
        const rcas = yield nokAnalyses_1.default.getNokAnalyseByNok(nokId);
        res.json(rcas);
    }
    catch (err) {
        res.status(404).json({ error: 'No NOK found' });
    }
});
// Create a New Analyse
const addAnalyse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const costData = req.body;
    try {
        const result = yield nokAnalyses_1.default.createNokAnalyse(costData);
        res.status(201).json(result);
    }
    catch (err) {
        let errorMessage = 'Something went wrong.';
        if (err instanceof Error) {
            errorMessage += err.message;
        }
        res.status(409).json({ error: `${errorMessage}` });
    }
});
// Remove a Analyse
const deleteAnalyse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield nokAnalyses_1.default.deleteAnalyse(Number(id));
        res.status(200).json(result);
    }
    catch (err) {
        res.status(404).json({ error: 'Analyse not found' });
    }
});
// Update Analyse Status
const updateAnalyseStatue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const analyseStatus = req.body;
    try {
        const result = yield nokAnalyses_1.default.updateAnalyseStatue(Number(id), analyseStatus);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(404).json({ error: 'Analyse not found' });
    }
});
exports.default = {
    getAllAnalyses,
    getAnalyse,
    getNokAnalyseByNok,
    addAnalyse,
    deleteAnalyse,
    updateAnalyseStatue,
};
