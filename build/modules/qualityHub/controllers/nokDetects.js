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
const nokDetects_1 = __importDefault(require("../services/nokDetects"));
// Get All NOK Detects
const getAllNokDetects = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nokDetects = yield nokDetects_1.default.getAllNokDetects();
        res.json(nokDetects);
    }
    catch (err) {
        res.status(500).json({ error: 'No NOK found' });
    }
});
// Get a NOK Detect by Id
const getNokDetect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const nokDetect = yield nokDetects_1.default.getNokDetect(Number(id));
        res.json(nokDetect);
    }
    catch (err) {
        res.status(404).json({ error: 'No NOK found' });
    }
});
// Get NOK Detects by Product Id
const getNokDetectsByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = Number(req.params.id);
    if (!productId) {
        res.status(400).json({ error: 'Invalid product id' });
    }
    try {
        const nokDetects = yield nokDetects_1.default.getNokDetectsByProduct(productId);
        res.json(nokDetects);
    }
    catch (err) {
        res.status(404).json({ error: 'No NOK found' });
    }
});
// Create a New NOK Detect
const addNokDetect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nokDetectData = req.body;
    try {
        const result = yield nokDetects_1.default.createNokDetect(nokDetectData);
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
// Edit an Existing NOK Detect
const editNokDetect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
        res.status(401).json({ error: 'Operation not allowed' });
    }
    const nokDetectData = req.body;
    try {
        const result = yield nokDetects_1.default.updateNokDetect(id, nokDetectData);
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
    getAllNokDetects,
    getNokDetect,
    getNokDetectsByProduct,
    addNokDetect,
    editNokDetect,
};
