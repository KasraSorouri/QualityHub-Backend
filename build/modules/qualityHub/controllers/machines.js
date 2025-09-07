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
const machines_1 = __importDefault(require("../services/machines"));
// Get All Machines
const getAllMachines = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const machines = yield machines_1.default.getAllMachines();
        res.json(machines);
    }
    catch (err) {
        res.status(500).json({ error: 'No machine found' });
    }
});
// Get a Machine by Id
const getMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const machine = yield machines_1.default.getMachine(Number(id));
        res.json(machine);
    }
    catch (err) {
        res.status(404).json({ error: 'Machine not found' });
    }
});
// Create a New Machine
const addMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const machineData = req.body;
    try {
        const result = yield machines_1.default.createMachine(machineData);
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
// Edit an Existing Machine
const editMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
        res.status(401).json({ error: 'Operation not allowed' });
    }
    const machineData = req.body;
    try {
        const result = yield machines_1.default.updateMachine(id, machineData);
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
    getAllMachines,
    getMachine,
    addMachine,
    editMachine,
};
