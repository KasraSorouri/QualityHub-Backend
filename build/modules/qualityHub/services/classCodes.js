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
// Define ClassCode query
const query = {
    attributes: { exclude: [] },
};
// Get all ClassCodes
const getAllClassCodes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classCodes = yield models_1.ClassCode.findAll(query);
        return classCodes;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Get a ClassCode based on ID
const getClassCode = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const classCode = yield models_1.ClassCode.findByPk(id, query);
    if (!classCode) {
        throw new Error('the classCode not found');
    }
    return classCode;
});
// Create a new ClassCode
const createClassCode = (classCodeData) => __awaiter(void 0, void 0, void 0, function* () {
    const newClassCodeData = (0, dataProcessor_1.classCodeProcessor)(classCodeData);
    try {
        const classCode = yield models_1.ClassCode.create(newClassCodeData);
        return classCode;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update an ClassCode
const updateClassCode = (id, classCodeData) => __awaiter(void 0, void 0, void 0, function* () {
    const newClassCodeData = (0, dataProcessor_1.classCodeProcessor)(classCodeData);
    try {
        const classCode = yield models_1.ClassCode.findByPk(id);
        if (!classCode) {
            throw new Error('ClassCode not found!');
        }
        const updatedClassCode = yield classCode.update(newClassCodeData);
        return updatedClassCode;
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
    getAllClassCodes,
    getClassCode,
    createClassCode,
    updateClassCode,
};
