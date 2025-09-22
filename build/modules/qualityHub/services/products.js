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
// Define Product query
const query = {
    attributes: { exclude: [] },
    include: [
        {
            model: models_1.ProductGrp,
            as: 'productGrp',
            attributes: ['groupName', 'groupCode', 'id'],
        },
    ],
};
// Get all Products
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield models_1.Product.findAll(query);
        return products;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Get a Product based on ID
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield models_1.Product.findByPk(id, query);
    if (!product) {
        throw new Error('the product not found');
    }
    return product;
});
// Create a new Product
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const newProductData = (0, dataProcessor_1.productProcessor)(productData);
    try {
        const product = yield models_1.Product.create(newProductData);
        return product;
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
const updateProduct = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const newProductData = (0, dataProcessor_1.productProcessor)(productData);
    try {
        const product = yield models_1.Product.findByPk(id);
        if (!product) {
            throw new Error('Product not found!');
        }
        const updatedProduct = yield product.update(newProductData);
        return updatedProduct;
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
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
};
