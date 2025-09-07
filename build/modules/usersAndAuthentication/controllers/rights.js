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
const rights_1 = __importDefault(require("../services/rights"));
// Get all rights
const getAllRights = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rights = yield rights_1.default.getAllRights();
        res.json(rights);
    }
    catch (err) {
        res.status(500).json({ error: 'No right found' });
    }
});
// get a right with ID
const getRight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const right = yield rights_1.default.getRight(Number(id));
        res.json(right);
    }
    catch (err) {
        res.status(404).json({ error: 'Right not found' });
    }
});
// Create a new Right
const addRight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rightData = req.body;
    try {
        const newRight = yield rights_1.default.createRight(rightData);
        res.status(201).json(newRight);
    }
    catch (err) {
        res.status(409).json({ error: `${err}` });
    }
});
// Update a Right
const editRight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const rightData = req.body;
    try {
        const updatedRight = yield rights_1.default.updateRight(Number(id), rightData);
        res.json(updatedRight);
    }
    catch (err) {
        res.status(404).json({ error: 'Right not found' });
    }
});
exports.default = {
    getAllRights,
    getRight,
    addRight,
    editRight,
};
