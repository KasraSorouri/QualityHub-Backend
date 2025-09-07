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
const nokCodes_1 = __importDefault(require("../services/nokCodes"));
// Get All Nok Groups
const getAllNokCodes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nokCodes = yield nokCodes_1.default.getAllNokCodes();
        res.json(nokCodes);
    }
    catch (err) {
        res.status(500).json({ error: 'No nok group found' });
    }
});
// Get a Nok Group by Id
const getNokCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const nokCode = yield nokCodes_1.default.getNokCode(Number(id));
        res.json(nokCode);
    }
    catch (err) {
        res.status(404).json({ error: 'Nok Group not found' });
    }
});
// Create a New Nok Group
const addNokCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nokCodeData = req.body;
    try {
        const result = yield nokCodes_1.default.createNokCode(nokCodeData);
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
// Edit an Existing Nok
const editNokCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
        res.status(401).json({ error: 'Operation not allowed' });
    }
    const nokCodeData = req.body;
    try {
        const result = yield nokCodes_1.default.updateNokCode(id, nokCodeData);
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
    getAllNokCodes,
    getNokCode,
    addNokCode,
    editNokCode,
};
