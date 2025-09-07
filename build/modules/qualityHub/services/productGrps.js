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
// Get all Products
const getAllProductGrps = () => __awaiter(void 0, void 0, void 0, function* () {
    //const products = await Product.findAll(query);
    const productGrps = yield models_1.ProductGrp.findAll();
    return productGrps;
});
// Get a Product based on ID
const getProductGrp = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productGrp = yield models_1.ProductGrp.findByPk(id);
    if (!productGrp) {
        throw new Error('the product group not found');
    }
    return productGrp;
});
// Create a new Product Group
const createProductGrp = (productGrpData) => __awaiter(void 0, void 0, void 0, function* () {
    const newProductGrpData = (0, dataProcessor_1.productGrpProcessor)(productGrpData);
    try {
        const productGrp = yield models_1.ProductGrp.create(newProductGrpData);
        return productGrp;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update an Product
const updateProductGrp = (id, productGrpData) => __awaiter(void 0, void 0, void 0, function* () {
    const newProductGrpData = (0, dataProcessor_1.productGrpProcessor)(productGrpData);
    try {
        const productGrp = yield models_1.ProductGrp.findByPk(id);
        if (!productGrp) {
            throw new Error('Product Group not found!');
        }
        const updatedProductGrp = yield productGrp.update(newProductGrpData);
        return updatedProductGrp;
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
    getAllProductGrps,
    getProductGrp,
    createProductGrp,
    updateProductGrp,
};
