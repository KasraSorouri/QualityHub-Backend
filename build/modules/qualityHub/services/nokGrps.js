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
// Get all Noks
const getAllNokGrps = () => __awaiter(void 0, void 0, void 0, function* () {
    //const noks = await Nok.findAll(query);
    const nokGrps = yield models_1.NokGrp.findAll();
    return nokGrps;
});
// Get a Nok based on ID
const getNokGrp = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nokGrp = yield models_1.NokGrp.findByPk(id);
    if (!nokGrp) {
        throw new Error('the nok group not found');
    }
    return nokGrp;
});
// Create a new Nok Group
const createNokGrp = (nokGrpData) => __awaiter(void 0, void 0, void 0, function* () {
    const newNokGrpData = (0, dataProcessor_1.nokGrpProcessor)(nokGrpData);
    try {
        const nokGrp = yield models_1.NokGrp.create(newNokGrpData);
        return nokGrp;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update an Nok
const updateNokGrp = (id, nokGrpData) => __awaiter(void 0, void 0, void 0, function* () {
    const newNokGrpData = (0, dataProcessor_1.nokGrpProcessor)(nokGrpData);
    try {
        const nokGrp = yield models_1.NokGrp.findByPk(id);
        if (!nokGrp) {
            throw new Error('Nok Group not found!');
        }
        const updatedNokGrp = yield nokGrp.update(newNokGrpData);
        return updatedNokGrp;
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
    getAllNokGrps,
    getNokGrp,
    createNokGrp,
    updateNokGrp,
};
