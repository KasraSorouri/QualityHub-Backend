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
// Define Material query
const query = {
    attributes: { exclude: [] },
};
// Get all Materials
const getAllMaterials = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const materials = yield models_1.Material.findAll(query);
        return materials;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Get a Material based on ID
const getMaterial = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const material = yield models_1.Material.findByPk(id, query);
    if (!material) {
        throw new Error('the material not found');
    }
    return material;
});
// Create a new Material
const createMaterial = (materialData) => __awaiter(void 0, void 0, void 0, function* () {
    const newMaterialData = (0, dataProcessor_1.materialProcessor)(materialData);
    try {
        const material = yield models_1.Material.create(newMaterialData);
        return material;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update an Material
const updateMaterial = (id, materialData) => __awaiter(void 0, void 0, void 0, function* () {
    const newMaterialData = (0, dataProcessor_1.materialProcessor)(materialData);
    try {
        const material = yield models_1.Material.findByPk(id);
        if (!material) {
            throw new Error('Material not found!');
        }
        const updatedMaterial = yield material.update(newMaterialData);
        return updatedMaterial;
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
    getAllMaterials,
    getMaterial,
    createMaterial,
    updateMaterial,
};
