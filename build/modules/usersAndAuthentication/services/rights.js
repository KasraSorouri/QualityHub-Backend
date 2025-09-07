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
// Get All rights
const getAllRights = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Right.findAll({});
    return result;
});
// Get a right based on ID
const getRight = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Right.findByPk(id);
    if (!result) {
        throw new Error('the right not found');
    }
    return result;
});
// Create a new right
const createRight = (rightData) => __awaiter(void 0, void 0, void 0, function* () {
    const newRightData = (0, dataProcessor_1.rightProcessor)(rightData);
    const { right, relatedModule } = newRightData;
    try {
        const newRight = yield models_1.Right.create({ right, relatedModule });
        return newRight;
    }
    catch (err) {
        let errorMessage = 'Something went wrong.';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update a right
const updateRight = (id, rightData) => __awaiter(void 0, void 0, void 0, function* () {
    const newRightData = (0, dataProcessor_1.rightProcessor)(rightData);
    try {
        const right = yield models_1.Right.findByPk(id);
        if (!right) {
            throw new Error('Right not found!');
        }
        yield right.update(newRightData);
        return right;
    }
    catch (err) {
        let errorMessage = 'Something went wrong.';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
exports.default = {
    getAllRights,
    getRight,
    createRight,
    updateRight,
};
