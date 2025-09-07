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
const nokRCAs_1 = __importDefault(require("../services/nokRCAs"));
// Get All Rcas
const getAllRcas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rcas = yield nokRCAs_1.default.getAllRcas();
        res.json(rcas);
    }
    catch (err) {
        res.status(500).json({ error: 'No rca found' });
    }
});
// Get a Rca by Id
const getRca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const rca = yield nokRCAs_1.default.getRca(Number(id));
        res.json(rca);
    }
    catch (err) {
        res.status(404).json({ error: 'Rca not found' });
    }
});
// Get RCAs by Nok Id
const getNokRcaByNok = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nokId = Number(req.params.id);
    if (!nokId) {
        res.status(400).json({ error: 'Invalid product id' });
    }
    try {
        const rcas = yield nokRCAs_1.default.getNokRcaByNok(nokId);
        res.json(rcas);
    }
    catch (err) {
        res.status(404).json({ error: 'No NOK found' });
    }
});
// Create a New Rca
const addRca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const costData = req.body;
    try {
        const result = yield nokRCAs_1.default.createNokRca(costData);
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
// Remove a Rca
const deleteRca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield nokRCAs_1.default.deleteRca(Number(id));
        res.status(200).json(result);
    }
    catch (err) {
        res.status(404).json({ error: 'Rca not found' });
    }
});
exports.default = {
    getAllRcas,
    getRca,
    getNokRcaByNok,
    addRca,
    deleteRca,
};
