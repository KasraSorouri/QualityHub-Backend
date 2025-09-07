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
// Define WorkShift query
const query = {
    attributes: { exclude: [] },
};
// Get all WorkShifts
const getAllWorkShifts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workShifts = yield models_1.WorkShift.findAll();
        return workShifts;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Get a WorkShift based on ID
const getWorkShift = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const workShift = yield models_1.WorkShift.findByPk(id, query);
    if (!workShift) {
        throw new Error('the workShift not found');
    }
    return workShift;
});
// Create a new WorkShift
const createWorkShift = (workShiftData) => __awaiter(void 0, void 0, void 0, function* () {
    const newWorkShiftData = (0, dataProcessor_1.workShiftProcessor)(workShiftData);
    try {
        const workShift = yield models_1.WorkShift.create(newWorkShiftData);
        return workShift;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update an WorkShift
const updateWorkShift = (id, workShiftData) => __awaiter(void 0, void 0, void 0, function* () {
    const newWorkShiftData = (0, dataProcessor_1.workShiftProcessor)(workShiftData);
    try {
        const workShift = yield models_1.WorkShift.findByPk(id);
        if (!workShift) {
            throw new Error('WorkShift not found!');
        }
        const updatedWorkShift = yield workShift.update(newWorkShiftData);
        return updatedWorkShift;
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
    getAllWorkShifts,
    getWorkShift,
    createWorkShift,
    updateWorkShift,
};
