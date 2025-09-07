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
const reworks_1 = __importDefault(require("../services/reworks"));
// Get All Reworks
const getAllReworks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reworks = yield reworks_1.default.getAllReworks();
        res.json(reworks);
    }
    catch (err) {
        res.status(500).json({ error: 'No rework found' });
    }
});
// Get a Rework by Id
const getRework = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const rework = yield reworks_1.default.getRework(Number(id));
        res.json(rework);
    }
    catch (err) {
        res.status(404).json({ error: 'Rework not found' });
    }
});
// Get Reworks by Product Id
const getReworksByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = Number(req.params.id);
    if (!productId) {
        res.status(400).json({ error: 'Invalid product id' });
    }
    try {
        const reworks = yield reworks_1.default.getReworksByProduct(productId);
        res.json(reworks);
    }
    catch (err) {
        res.status(404).json({ error: 'No rework found' });
    }
});
// Create a New Rework
const addRework = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reworkData = req.body;
    try {
        const result = yield reworks_1.default.createRework(reworkData);
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
// Edit an Existing Rework
const editRework = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
        res.status(401).json({ error: 'Operation not allowed' });
    }
    const reworkData = req.body;
    try {
        const result = yield reworks_1.default.updateRework(id, reworkData);
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
    getAllReworks,
    getRework,
    getReworksByProduct,
    addRework,
    editRework,
};
