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
const rcaCodes_1 = __importDefault(require("../services/rcaCodes"));
// Get All RcaCode
const getAllRcaCodes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rcaCode = yield rcaCodes_1.default.getAllRcaCodes();
        res.json(rcaCode);
    }
    catch (err) {
        res.status(500).json({ error: 'No rcaCode found' });
    }
});
// Get a RcaCode by Id
const getRcaCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const rcaCode = yield rcaCodes_1.default.getRcaCode(Number(id));
        res.json(rcaCode);
    }
    catch (err) {
        res.status(404).json({ error: 'RcaCode not found' });
    }
});
// Create a New RcaCode
const addRcaCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rcaCodeData = req.body;
    try {
        const result = yield rcaCodes_1.default.createRcaCode(rcaCodeData);
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
// Edit an Existing RcaCode
const editRcaCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
        res.status(401).json({ error: 'Operation not allowed' });
    }
    const rcaCodeData = req.body;
    try {
        const result = yield rcaCodes_1.default.updateRcaCode(id, rcaCodeData);
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
exports.default = {
    getAllRcaCodes,
    getRcaCode,
    addRcaCode,
    editRcaCode,
};
