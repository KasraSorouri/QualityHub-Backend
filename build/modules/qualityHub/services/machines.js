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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
const dataProcessor_1 = require("../utils/dataProcessor");
// Define Machine query
const query = {
    attributes: { exclude: [] },
    include: [
        {
            model: models_1.Station,
            as: 'station',
            attributes: ['id', 'stationName', 'stationCode'],
        },
    ],
};
// Get all Machines
const getAllMachines = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const machines = yield models_1.Machine.findAll(query);
        return machines;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        console.log('**** error :', errorMessage);
        throw new Error(errorMessage);
    }
});
// Get a Machine based on ID
const getMachine = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const machine = yield models_1.Machine.findByPk(id, query);
    if (!machine) {
        throw new Error('the machine not found');
    }
    return machine;
});
// Create a new Machine
const createMachine = (machineData) => __awaiter(void 0, void 0, void 0, function* () {
    const newMachineData = (0, dataProcessor_1.machineProcessor)(machineData);
    try {
        const machine = yield models_1.Machine.create(newMachineData);
        return machine;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update an Machine
const updateMachine = (id, machineData) => __awaiter(void 0, void 0, void 0, function* () {
    const newMachineData = (0, dataProcessor_1.machineProcessor)(machineData);
    try {
        const machine = yield models_1.Machine.findByPk(id);
        if (!machine) {
            throw new Error('Machine not found!');
        }
        const updatedMachine = yield machine.update(newMachineData);
        return updatedMachine;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
exports.default = {
    getAllMachines,
    getMachine,
    createMachine,
    updateMachine,
};
