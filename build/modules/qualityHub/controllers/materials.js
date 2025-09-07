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
const materials_1 = __importDefault(require("../services/materials"));
// Get All Materials
const getAllMaterials = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const materials = yield materials_1.default.getAllMaterials();
        res.json(materials);
    }
    catch (err) {
        res.status(500).json({ error: 'No material found' });
    }
});
// Get a Material by Id
const getMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const material = yield materials_1.default.getMaterial(Number(id));
        res.json(material);
    }
    catch (err) {
        res.status(404).json({ error: 'Material not found' });
    }
});
// Create a New Material
const addMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const materialData = req.body;
    try {
        const result = yield materials_1.default.createMaterial(materialData);
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
// Edit an Existing Material
const editMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
        res.status(401).json({ error: 'Operation not allowed' });
    }
    const materialData = req.body;
    try {
        const result = yield materials_1.default.updateMaterial(id, materialData);
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
    getAllMaterials,
    getMaterial,
    addMaterial,
    editMaterial,
};
