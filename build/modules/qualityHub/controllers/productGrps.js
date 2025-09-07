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
const productGrps_1 = __importDefault(require("../services/productGrps"));
// Get All Product Groups
const getAllProductGrps = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productGrps = yield productGrps_1.default.getAllProductGrps();
        res.json(productGrps);
    }
    catch (err) {
        res.status(500).json({ error: 'No product group found' });
    }
});
// Get a Product Group by Id
const getProductGrp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const productGrp = yield productGrps_1.default.getProductGrp(Number(id));
        res.json(productGrp);
    }
    catch (err) {
        res.status(404).json({ error: 'Product Group not found' });
    }
});
// Create a New Product Group
const addProductGrp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productGrpData = req.body;
    try {
        const result = yield productGrps_1.default.createProductGrp(productGrpData);
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
// Edit an Existing Product
const editProductGrp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
        res.status(401).json({ error: 'Operation not allowed' });
    }
    const productGrpData = req.body;
    try {
        const result = yield productGrps_1.default.updateProductGrp(id, productGrpData);
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
    getAllProductGrps,
    getProductGrp,
    addProductGrp,
    editProductGrp,
};
