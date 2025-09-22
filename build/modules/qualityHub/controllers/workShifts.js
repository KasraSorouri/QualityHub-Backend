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
const workShifts_1 = __importDefault(require("../services/workShifts"));
// Get All WorkShifts
const getAllWorkShifts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workShifts = yield workShifts_1.default.getAllWorkShifts();
        res.json(workShifts);
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Get a WorkShift by Id
const getWorkShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const workShift = yield workShifts_1.default.getWorkShift(Number(id));
        res.json(workShift);
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Create a New WorkShift
const addWorkShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workShiftData = req.body;
    try {
        const result = yield workShifts_1.default.createWorkShift(workShiftData);
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
// Edit an Existing WorkShift
const editWorkShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
        res.status(401).json({ error: 'Operation not allowed' });
    }
    const workShiftData = req.body;
    try {
        const result = yield workShifts_1.default.updateWorkShift(id, workShiftData);
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
    getAllWorkShifts,
    getWorkShift,
    addWorkShift,
    editWorkShift,
};
